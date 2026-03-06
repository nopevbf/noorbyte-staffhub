import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { db } from "../../lib/db.js";
import { accounts } from "../../db/schema/accounts.js";

/**
 * Merotasi refresh token akun credential agar token lama tidak dapat dipakai ulang.
 * @param userId ID user pemilik token.
 * @param currentRefreshToken Token refresh lama.
 * @returns Token refresh baru atau null jika token lama tidak valid.
 */
export async function rotateRefreshToken(
  userId: string,
  currentRefreshToken?: string,
) {
  const existing = currentRefreshToken
    ? await db.query.accounts.findFirst({
        where: and(
          eq(accounts.userId, userId),
          eq(accounts.providerId, "credential"),
          eq(accounts.refreshToken, currentRefreshToken),
        ),
      })
    : await db.query.accounts.findFirst({
        where: and(
          eq(accounts.userId, userId),
          eq(accounts.providerId, "credential"),
        ),
      });

  if (!existing) {
    return null;
  }

  const nextRefreshToken = randomUUID();
  const nextRefreshTokenExpiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  );

  await db
    .update(accounts)
    .set({
      refreshToken: nextRefreshToken,
      refreshTokenExpiresAt: nextRefreshTokenExpiresAt,
      updatedAt: new Date(),
    })
    .where(eq(accounts.id, existing.id));

  return {
    refreshToken: nextRefreshToken,
    refreshTokenExpiresAt: nextRefreshTokenExpiresAt,
  };
}
