import express from "express";
import { env } from "./env.js";
import { redis, redisEnabled } from "./lib/redis.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { auditRouter } from "./modules/audit/audit.routes.js";
import { usersRouter } from "./modules/users/users.routes.js";
import { rolesRouter } from "./modules/roles/roles.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { withRequestId } from "./middleware/request-id.middleware.js";
import { ok } from "./utils/api-response.js";

const app = express();

app.use(express.json());
app.use(withRequestId);

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
  process.stdout.write(`Server listening on http://localhost:${env.PORT}\n`);
});

process.on("SIGINT", async () => {
  server.close();
  if (redisEnabled && redis && redis.status === "ready") {
    await redis.quit();
  }
  process.exit(0);
});
