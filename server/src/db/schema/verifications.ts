import { randomUUID } from "node:crypto";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const verifications = pgTable("verifications", {
  id: text("id")
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 512 }).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
