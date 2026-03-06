import { Redis } from "ioredis";
import { env } from "../env.js";

export const redisEnabled = env.REDIS_ENABLED;

export const redis = redisEnabled
  ? new Redis(env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 3,
    })
  : null;
