import type { NextFunction, Request, Response } from "express";
import { env } from "../env.js";
import { fail } from "../utils/api-response.js";

function normalizeUrlOrigin(input: string) {
  try {
    return new URL(input).origin;
  } catch {
    return null;
  }
}

/**
 * Mengecek apakah URL redirect ada di daftar allowlist.
 */
function isAllowedRedirect(redirectUrl: string) {
  const urlOrigin = normalizeUrlOrigin(redirectUrl);
  if (!urlOrigin) {
    return false;
  }

  const allowlist = env.REDIRECT_ALLOWLIST.split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => normalizeUrlOrigin(item))
    .filter((item): item is string => Boolean(item));

  return allowlist.includes(urlOrigin);
}

/**
 * Middleware validasi field `redirectTo` untuk mencegah open redirect.
 */
export function validateRedirectAllowlist(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const body = req.body as { redirectTo?: unknown };

  if (typeof body?.redirectTo !== "string") {
    return res
      .status(400)
      .json(fail("INVALID_REDIRECT", "Request could not be completed"));
  }

  if (!isAllowedRedirect(body.redirectTo)) {
    return res
      .status(400)
      .json(fail("INVALID_REDIRECT", "Request could not be completed"));
  }

  return next();
}
