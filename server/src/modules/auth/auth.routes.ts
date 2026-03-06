import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../../lib/auth.js";
import { validateRedirectAllowlist } from "../../middleware/redirect-allowlist.middleware.js";
import { rateLimitPasswordResetByEmail } from "../../middleware/rate-limit-password-reset.middleware.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { env } from "../../env.js";
import { fail, ok } from "../../utils/api-response.js";
import { rotateRefreshToken } from "./refresh-token.service.js";

export const authRouter = Router();

authRouter.post(
  "/forgot-password",
  validateRedirectAllowlist,
  rateLimitPasswordResetByEmail,
);

authRouter.post("/rotate-refresh-token", requireAuth, async (req, res) => {
  const cookieHeader = req.headers.cookie ?? "";
  const matchedRefreshToken = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("refresh_token="));

  const refreshTokenFromCookie = matchedRefreshToken
    ? decodeURIComponent(matchedRefreshToken.split("=").slice(1).join("="))
    : undefined;

  const payload = req.body as { refreshToken?: string };
  const refreshToken = payload.refreshToken ?? refreshTokenFromCookie;

  const rotated = await rotateRefreshToken(
    String(req.authUser?.id),
    refreshToken,
  );

  if (!rotated) {
    return res.status(401).json(fail("UNAUTHORIZED", "Unauthorized"));
  }

  res.cookie("refresh_token", rotated.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    expires: rotated.refreshTokenExpiresAt,
  });

  return res.status(200).json(ok({ expiresAt: rotated.refreshTokenExpiresAt }));
});

authRouter.all("/*rest", toNodeHandler(auth));
