import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "../env.js";
import { db } from "./db.js";
import { account, session, user, verification } from "../db/schema/index.js";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_BASE_URL,
  trustedOrigins: env.REDIRECT_ALLOWLIST.split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  session: {
    expiresIn: env.JWT_EXPIRES_IN_DAYS * 24 * 60 * 60,
    updateAge: 60 * 60,
  },
});
