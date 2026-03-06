import express from "express";
import { env } from "./env.js";
import { redis, redisEnabled } from "./lib/redis.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { auditRouter } from "./modules/audit/audit.routes.js";
import { usersRouter } from "./modules/users/users.routes.js";
import { rolesRouter } from "./modules/roles/roles.routes.js";
import { stripeWebhookRouter } from "./modules/webhooks/stripe.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { withRequestId } from "./middleware/request-id.middleware.js";
import { withStrictCors } from "./middleware/cors.middleware.js";
import { ok } from "./utils/api-response.js";
import { logger } from "./utils/logger.js";

const app = express();

app.use(withRequestId);
app.use(withStrictCors);

app.use("/api/webhooks", express.raw({ type: "application/json" }));
app.use("/api/webhooks", stripeWebhookRouter);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  return res.json(ok({ status: "ok" }));
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/audit-logs", auditRouter);

app.use(errorMiddleware);

const server = app.listen(env.PORT, async () => {
  if (redisEnabled && redis) {
    await redis.connect().catch(() => undefined);
  }
  logger.info("Server started", {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  });
});

process.on("SIGINT", async () => {
  server.close();
  if (redisEnabled && redis && redis.status === "ready") {
    await redis.quit();
  }
  logger.info("Server stopped");
  process.exit(0);
});
