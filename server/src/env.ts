import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  REDIS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  BETTER_AUTH_SECRET: z.string().min(16),
  BETTER_AUTH_BASE_URL: z.string().url(),
  CORS_ALLOWED_ORIGINS: z.string().default(""),
  PRODUCTION_DOMAIN: z.string().default("example.com"),
  REDIRECT_ALLOWLIST: z
    .string()
    .default("http://localhost:5173,https://example.com"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  JWT_EXPIRES_IN_DAYS: z.coerce.number().int().positive().default(7),
});

export const env = envSchema.parse(process.env);
