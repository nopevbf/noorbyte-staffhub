import type { NextFunction, Request, Response } from "express";
import { redis, redisEnabled } from "../lib/redis.js";
import { fail } from "../utils/api-response.js";

type MemoryRateLimitEntry = {
  count: number;
  expiresAt: number;
};

const memoryRateLimitStore = new Map<string, MemoryRateLimitEntry>();

/**
 * Membatasi request reset password maksimal 3 kali per email per jam.
 */
export async function rateLimitPasswordResetByEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const email =
    typeof (req.body as { email?: unknown })?.email === "string"
      ? (req.body as { email: string }).email.trim().toLowerCase()
      : "";

  if (!email) {
    return res
      .status(400)
      .json(fail("INVALID_EMAIL", "Request could not be completed"));
  }

  const key = `rate-limit:password-reset:${email}`;

  if (redisEnabled && redis) {
    const total = await redis.incr(key);
    if (total === 1) {
      await redis.expire(key, 60 * 60);
    }

    if (total > 3) {
      return res
        .status(429)
        .json(fail("RATE_LIMITED", "Request could not be completed"));
    }

    return next();
  }

  const now = Date.now();
  const existing = memoryRateLimitStore.get(key);

  if (!existing || existing.expiresAt <= now) {
    memoryRateLimitStore.set(key, {
      count: 1,
      expiresAt: now + 60 * 60 * 1000,
    });
    return next();
  }

  existing.count += 1;
  memoryRateLimitStore.set(key, existing);

  if (existing.count > 3) {
    return res
      .status(429)
      .json(fail("RATE_LIMITED", "Request could not be completed"));
  }

  return next();
}
