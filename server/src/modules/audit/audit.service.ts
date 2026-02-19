import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "../../lib/db.js";
import { auditLogs } from "../../db/schema/audit-logs.js";
import { users } from "../../db/schema/users.js";

type AuditInput = {
  userId?: string | null;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
};

type ListAuditInput = {
  userId?: string;
  action?: string;
  resource?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
};

export const auditService = {
  async log(input: AuditInput) {
    await db.insert(auditLogs).values({
      userId: input.userId ?? null,
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId,
      details: input.details,
      ipAddress: input.ipAddress,
    });
  },

  async list(input: ListAuditInput) {
    const page = input.page && input.page > 0 ? input.page : 1;
    const limit = input.limit && input.limit > 0 ? input.limit : 20;
    const offset = (page - 1) * limit;

    const filters = [];

    if (input.userId) {
      filters.push(eq(auditLogs.userId, input.userId));
    }

    if (input.action) {
      filters.push(eq(auditLogs.action, input.action));
    }

    if (input.resource) {
      filters.push(eq(auditLogs.resource, input.resource));
    }

    if (input.from) {
      filters.push(gte(auditLogs.createdAt, new Date(input.from)));
    }

    if (input.to) {
      filters.push(lte(auditLogs.createdAt, new Date(input.to)));
    }

    const whereExpr = filters.length > 0 ? and(...filters) : undefined;

    const items = await db
      .select({
        id: auditLogs.id,
        userId: auditLogs.userId,
        actorName: users.name,
        action: auditLogs.action,
        resource: auditLogs.resource,
        resourceId: auditLogs.resourceId,
        details: auditLogs.details,
        ipAddress: auditLogs.ipAddress,
        createdAt: auditLogs.createdAt,
      })
      .from(auditLogs)
      .leftJoin(users, eq(auditLogs.userId, users.id))
      .where(whereExpr)
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      items,
      pagination: {
        page,
        limit,
      },
    };
  },
};
