import type { NextFunction, Request, Response } from "express";
import { fail } from "../utils/api-response.js";

/**
 * Middleware guard untuk memastikan hanya role admin yang bisa mengeksekusi aksi tertentu.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.authUser?.role !== "admin") {
    return res.status(403).json(fail("FORBIDDEN", "Forbidden"));
  }

  return next();
}
