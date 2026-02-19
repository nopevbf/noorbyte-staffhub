import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { fail } from "../utils/api-response.js";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json(fail("UNAUTHORIZED", "Unauthorized"));
  }

  req.authUser = {
    id: session.user.id,
    roleId: (session.user as { roleId?: string | null }).roleId ?? null,
    status: (session.user as { status?: string }).status,
  };

  req.authSession = {
    id: session.session.id,
    expiresAt: session.session.expiresAt,
  };

  return next();
}
