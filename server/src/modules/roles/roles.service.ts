import { and, eq } from "drizzle-orm";
import { db } from "../../lib/db.js";
import { redis, redisEnabled } from "../../lib/redis.js";
import { rolePermissions } from "../../db/schema/role-permissions.js";
import { roles } from "../../db/schema/roles.js";
import { auditService } from "../audit/audit.service.js";
import { ApiError } from "../../utils/api-error.js";

type RoleInput = {
  name: string;
  description?: string;
};

type RolePermissionInput = {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
};

type PermissionMap = Record<
  string,
  {
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canExport: boolean;
  }
>;

async function clearRolePermissionCache(roleId: string) {
  if (!redisEnabled || !redis) {
    return;
  }

  const stream = redis.scanStream({ match: `role:${roleId}:perm:*` });
  for await (const keys of stream) {
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}

export const rolesService = {
  async list() {
    return db.select().from(roles);
  },

  async getPermissionsForRole(roleId: string): Promise<PermissionMap> {
    const cacheKey = `role:${roleId}:permissions`;
    if (redisEnabled && redis) {
      const cached = await redis.get(cacheKey);

      if (cached) {
        return JSON.parse(cached) as PermissionMap;
      }
    }

    const rows = await db
      .select()
      .from(rolePermissions)
      .where(eq(rolePermissions.roleId, roleId));

    const map = rows.reduce<PermissionMap>((acc, row) => {
      acc[row.module] = {
        canView: row.canView,
        canCreate: row.canCreate,
        canEdit: row.canEdit,
        canDelete: row.canDelete,
        canExport: row.canExport,
      };
      return acc;
    }, {});

    if (redisEnabled && redis) {
      await redis.set(cacheKey, JSON.stringify(map), "EX", 900);
    }

    return map;
  },

  async getById(id: string) {
    const role = await db.query.roles.findFirst({ where: eq(roles.id, id) });

    if (!role) {
      throw new ApiError(404, "ROLE_NOT_FOUND", "Role not found");
    }

    const permissions = await db
      .select()
      .from(rolePermissions)
      .where(eq(rolePermissions.roleId, id));

    return { ...role, permissions };
  },

  async create(input: RoleInput) {
    const existing = await db.query.roles.findFirst({
      where: eq(roles.name, input.name),
    });

    if (existing) {
      throw new ApiError(409, "ROLE_EXISTS", "Role name already exists");
    }

    const [created] = await db
      .insert(roles)
      .values({
        name: input.name,
        description: input.description,
      })
      .returning();

    await auditService.log({
      action: "CREATE",
      resource: "Role",
      resourceId: created.id,
      details: `Created role ${created.name}`,
    });

    return created;
  },

  async update(id: string, input: Partial<RoleInput>) {
    const found = await db.query.roles.findFirst({ where: eq(roles.id, id) });

    if (!found) {
      throw new ApiError(404, "ROLE_NOT_FOUND", "Role not found");
    }

    const [updated] = await db
      .update(roles)
      .set({
        name: input.name ?? found.name,
        description: input.description ?? found.description ?? null,
        updatedAt: new Date(),
      })
      .where(eq(roles.id, id))
      .returning();

    await auditService.log({
      action: "UPDATE",
      resource: "Role",
      resourceId: id,
      details: `Updated role ${updated.name}`,
    });

    return updated;
  },

  async upsertPermissions(roleId: string, permissions: RolePermissionInput[]) {
    const foundRole = await db.query.roles.findFirst({
      where: eq(roles.id, roleId),
    });

    if (!foundRole) {
      throw new ApiError(404, "ROLE_NOT_FOUND", "Role not found");
    }

    for (const item of permissions) {
      const existing = await db.query.rolePermissions.findFirst({
        where: and(
          eq(rolePermissions.roleId, roleId),
          eq(rolePermissions.module, item.module),
        ),
      });

      if (existing) {
        await db
          .update(rolePermissions)
          .set({ ...item, updatedAt: new Date() })
          .where(eq(rolePermissions.id, existing.id));
      } else {
        await db.insert(rolePermissions).values({
          roleId,
          ...item,
        });
      }
    }

    await clearRolePermissionCache(roleId);

    await auditService.log({
      action: "UPDATE",
      resource: "RolePermission",
      resourceId: roleId,
      details: `Updated permission matrix (${permissions.length} rows)`,
    });

    return db
      .select()
      .from(rolePermissions)
      .where(eq(rolePermissions.roleId, roleId));
  },

  async remove(id: string) {
    const found = await db.query.roles.findFirst({ where: eq(roles.id, id) });

    if (!found) {
      throw new ApiError(404, "ROLE_NOT_FOUND", "Role not found");
    }

    if (found.isSystem) {
      throw new ApiError(400, "SYSTEM_ROLE", "System role cannot be deleted");
    }

    await db.delete(roles).where(eq(roles.id, id));
    await clearRolePermissionCache(id);

    await auditService.log({
      action: "DELETE",
      resource: "Role",
      resourceId: id,
      details: `Deleted role ${found.name}`,
    });

    return { id };
  },
};
