import type { NextFunction, Request, Response } from "express";
import { and, eq } from "drizzle-orm";
import { db } from "../lib/db.js";
import { redis, redisEnabled } from "../lib/redis.js";
import { rolePermissions } from "../db/schema/role-permissions.js";
import { fail } from "../utils/api-response.js";

type PermissionAction =
  | "canView"
  | "canCreate"
  | "canEdit"
  | "canDelete"
  | "canExport";

type PermissionRecord = {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
};

async function getRolePermission(roleId: string, module: string) {
  const cacheKey = `role:${roleId}:perm:${module}`;
  if (redisEnabled && redis) {
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as PermissionRecord;
    }
  }

  const row = await db.query.rolePermissions.findFirst({
    where: and(
      eq(rolePermissions.roleId, roleId),
      eq(rolePermissions.module, module),
    ),
  });

  if (!row) {
    return null;
  }

  if (redisEnabled && redis) {
    await redis.set(cacheKey, JSON.stringify(row), "EX", 900);
  }

  return row;
}

export function requirePermission(module: string, action: PermissionAction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const roleId = req.authUser?.roleId;

    if (!roleId) {
      return res.status(403).json(fail("FORBIDDEN", "Role is missing"));
    }

    const perm = await getRolePermission(roleId, module);

    if (!perm || !perm[action]) {
      return res
        .status(403)
        .json(fail("FORBIDDEN", "Insufficient permissions"));
    }

    return next();
  };
}
