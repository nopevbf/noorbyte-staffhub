import { db } from "../../lib/db.js";
import { auditLogs } from "../../db/schema/audit-logs.js";

export const authService = {
  async onSignIn(userId: string, ipAddress?: string) {
    await db.insert(auditLogs).values({
      userId,
      action: "SIGN_IN",
      resource: "Auth",
      details: "User signed in",
      ipAddress,
    });
  },

  async onSignOut(userId: string, ipAddress?: string) {
    await db.insert(auditLogs).values({
      userId,
      action: "SIGN_OUT",
      resource: "Auth",
      details: "User signed out",
      ipAddress,
    });
  },
};
