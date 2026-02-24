import type { NextFunction, Request, Response } from "express";
import { env } from "../env.js";
import { fail } from "../utils/api-response.js";

function normalizeOrigin(input: string) {
  try {
    const parsed = new URL(input);
    return parsed.origin;
  } catch {
    return null;
  }
}

/**
 * Menghasilkan daftar origin yang diizinkan untuk CORS berdasarkan environment.
 */
function getAllowedOrigins() {
  const productionOrigin = normalizeOrigin(`https://${env.PRODUCTION_DOMAIN}`);
  const configuredOrigins = env.CORS_ALLOWED_ORIGINS.split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => normalizeOrigin(item))
    .filter((item): item is string => Boolean(item));

  if (env.NODE_ENV === "production") {
    return new Set([productionOrigin, ...configuredOrigins].filter(Boolean));
  }

  return new Set(
    [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      productionOrigin,
      ...configuredOrigins,
    ].filter(Boolean),
  );
}

/**
 * Middleware CORS ketat untuk membatasi origin yang dapat mengakses API.
 */
export function withStrictCors(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const originHeader = req.headers.origin;

  if (!originHeader) {
    return next();
  }

  const origin = normalizeOrigin(originHeader);
  const allowedOrigins = getAllowedOrigins();

  if (!origin || !allowedOrigins.has(origin)) {
    return res
      .status(403)
      .json(fail("CORS_FORBIDDEN", "Request could not be completed"));
  }

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, X-Request-Id",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );

  if (req.method === "OPTIONS") {
    return res.status(204).send();
  }

  return next();
}
