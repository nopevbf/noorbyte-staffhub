import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { requirePermission } from "../../middleware/rbac.middleware.js";
import { ok } from "../../utils/api-response.js";
import { auditService } from "./audit.service.js";

export const auditRouter = Router();

auditRouter.get(
  "/",
  requireAuth,
  requirePermission("settings", "canView"),
  async (req, res) => {
    const data = await auditService.list({
      userId:
        typeof req.query.userId === "string" ? req.query.userId : undefined,
      action:
        typeof req.query.action === "string" ? req.query.action : undefined,
      resource:
        typeof req.query.resource === "string" ? req.query.resource : undefined,
      from: typeof req.query.from === "string" ? req.query.from : undefined,
      to: typeof req.query.to === "string" ? req.query.to : undefined,
      page:
        typeof req.query.page === "string" ? Number(req.query.page) : undefined,
      limit:
        typeof req.query.limit === "string"
          ? Number(req.query.limit)
          : undefined,
    });

    return res.json(ok(data, { requestId: req.requestId }));
  },
);
