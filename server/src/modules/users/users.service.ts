import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { createHash } from "node:crypto";
import { db } from "../../lib/db.js";
import { redis, redisEnabled } from "../../lib/redis.js";
import { accounts } from "../../db/schema/accounts.js";
import { roles } from "../../db/schema/roles.js";
import { sessions } from "../../db/schema/sessions.js";
import { users } from "../../db/schema/users.js";
import { auditService } from "../audit/audit.service.js";
import { rolesService } from "../roles/roles.service.js";
import { ApiError } from "../../utils/api-error.js";

type ListInput = {
  search?: string;
  roleId?: string;
  status?: "active" | "inactive";
  page?: number;
  limit?: number;
};

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  roleId: string;
  branchId?: string | null;
};

type UpdateUserInput = {
  name?: string;
  email?: string;
  roleId?: string;
  branchId?: string | null;
};

async function invalidateUserSessions(userId: string) {
  const currentSessions = await db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId));

  if (redisEnabled && redis) {
    for (const session of currentSessions) {
      await redis.del(`session:${session.token}`);
    }
  }

  await db.delete(sessions).where(eq(sessions.userId, userId));
}

export const usersService = {
  async getCurrentUser(userId: string) {
    const row = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        role: true,
        branch: true,
      },
    });

    if (!row) {
      throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }

    const permissions = row.roleId
      ? await rolesService.getPermissionsForRole(row.roleId)
      : {};

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      status: row.status,
      role: row.role
        ? {
            id: row.role.id,
            name: row.role.name,
          }
        : null,
      branch: row.branch
        ? {
            id: row.branch.id,
            name: row.branch.name,
          }
        : null,
      permissions,
    };
  },

  async list(input: ListInput) {
    const page = input.page && input.page > 0 ? input.page : 1;
    const limit = input.limit && input.limit > 0 ? input.limit : 20;
    const offset = (page - 1) * limit;

    const whereClauses = [];

    if (input.search) {
      whereClauses.push(
        or(
          ilike(users.name, `%${input.search}%`),
          ilike(users.email, `%${input.search}%`),
        ),
      );
    }

    if (input.roleId) {
      whereClauses.push(eq(users.roleId, input.roleId));
    }

    if (input.status) {
      whereClauses.push(eq(users.status, input.status));
    }

    const whereExpr =
      whereClauses.length > 0 ? and(...whereClauses) : undefined;

    const rows = await db.query.users.findMany({
      where: whereExpr,
      with: {
        role: true,
        branch: true,
      },
      orderBy: [desc(users.createdAt)],
      limit,
      offset,
    });

    const [{ total }] = await db
      .select({ total: count() })
      .from(users)
      .where(whereExpr);

    return {
      items: rows,
      pagination: {
        page,
        limit,
        total,
      },
    };
  },

  async getById(id: string) {
    const row = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        role: true,
        branch: true,
      },
    });

    if (!row) {
      throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }

    return row;
  },

  async create(input: CreateUserInput) {
    const [existingEmail, existingRole] = await Promise.all([
      db.query.users.findFirst({ where: eq(users.email, input.email) }),
      db.query.roles.findFirst({ where: eq(roles.id, input.roleId) }),
    ]);

    if (existingEmail) {
      throw new ApiError(409, "EMAIL_EXISTS", "Email already used");
    }

    if (!existingRole) {
      throw new ApiError(400, "ROLE_NOT_FOUND", "Role does not exist");
    }

    if (existingRole.isSystem === false && existingRole.name.trim() === "") {
      throw new ApiError(400, "ROLE_INVALID", "Role is invalid");
    }

    const [created] = await db
      .insert(users)
      .values({
        name: input.name,
        email: input.email,
        roleId: input.roleId,
        branchId: input.branchId ?? null,
        status: "active",
      })
      .returning();

    const hashedPassword = createHash("sha256")
      .update(input.password)
      .digest("hex");

    await db.insert(accounts).values({
      userId: created.id,
      accountId: created.email,
      providerId: "credential",
      password: hashedPassword,
    });

    await auditService.log({
      userId: created.id,
      action: "CREATE",
      resource: "User",
      resourceId: created.id,
      details: `Created user ${created.email}`,
    });

    return created;
  },

  async update(id: string, input: UpdateUserInput) {
    const existing = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!existing) {
      throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }

    if (input.email && input.email !== existing.email) {
      const duplicate = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });
      if (duplicate) {
        throw new ApiError(409, "EMAIL_EXISTS", "Email already used");
      }
    }

    if (input.roleId) {
      const role = await db.query.roles.findFirst({
        where: eq(roles.id, input.roleId),
      });
      if (!role) {
        throw new ApiError(400, "ROLE_NOT_FOUND", "Role does not exist");
      }
    }

    const [updated] = await db
      .update(users)
      .set({
        name: input.name ?? existing.name,
        email: input.email ?? existing.email,
        roleId: input.roleId ?? existing.roleId,
        branchId: input.branchId ?? existing.branchId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    await auditService.log({
      userId: id,
      action: "UPDATE",
      resource: "User",
      resourceId: id,
      details: `Updated user ${updated.email}`,
    });

    return updated;
  },

  async updateStatus(id: string, status: "active" | "inactive") {
    const existing = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!existing) {
      throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }

    const [updated] = await db
      .update(users)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (status === "inactive") {
      await invalidateUserSessions(id);
    }

    await auditService.log({
      userId: id,
      action: "UPDATE",
      resource: "User",
      resourceId: id,
      details: `Set status to ${status}`,
    });

    return updated;
  },

  async remove(id: string) {
    const existing = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!existing) {
      throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }
    const result = await this.updateStatus(id, "inactive");
    await auditService.log({
      userId: id,
      action: "DELETE",
      resource: "User",
      resourceId: id,
      details: "Soft deleted user",
    });

    return result;
  },
};
