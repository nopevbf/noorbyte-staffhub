import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { db } from "../lib/db.js";
import { roles } from "../db/schema/roles.js";
import { users } from "../db/schema/users.js";
import { fail } from "../utils/api-response.js";
import { logger } from "../utils/logger.js";
import { eq } from "drizzle-orm";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json(fail("UNAUTHORIZED", "Unauthorized"));
    }

    const userRole = await db
      .select({ roleName: roles.name })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id))
      .where(eq(users.id, session.user.id))
      .limit(1);

    req.authUser = {
      id: session.user.id,
      roleId: (session.user as { roleId?: string | null }).roleId ?? null,
      role: userRole[0]?.roleName?.toLowerCase() ?? null,
      status: (session.user as { status?: string }).status,
    };

    req.authSession = {
      id: session.session.id,
      expiresAt: session.session.expiresAt,
    };

    return next();
  } catch (error) {
    logger.error("AuthMiddlewareError", {
      requestId: req.requestId,
      path: req.path,
      method: req.method,
      error,
    });

    return res.status(401).json(fail("UNAUTHORIZED", "Unauthorized"));
  }
}
