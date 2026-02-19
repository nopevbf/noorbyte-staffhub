import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { requirePermission } from "../../middleware/rbac.middleware.js";
import { ok } from "../../utils/api-response.js";
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
} from "./users.validator.js";
import { usersService } from "./users.service.js";

export const usersRouter = Router();

usersRouter.get("/me", requireAuth, async (req, res) => {
  const userId = String(req.authUser?.id);
  const data = await usersService.getCurrentUser(userId);
  return res.json(ok(data, { requestId: req.requestId }));
});

usersRouter.get(
  "/",
  requireAuth,
  requirePermission("settings", "canView"),
  async (req, res) => {
    const data = await usersService.list({
      search:
        typeof req.query.search === "string" ? req.query.search : undefined,
      roleId:
        typeof req.query.roleId === "string" ? req.query.roleId : undefined,
      status:
        req.query.status === "active" || req.query.status === "inactive"
          ? req.query.status
          : undefined,
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

usersRouter.get(
  "/:id",
  requireAuth,
  requirePermission("settings", "canView"),
  async (req, res) => {
    const id = String(req.params.id);
    const data = await usersService.getById(id);
    return res.json(ok(data, { requestId: req.requestId }));
  },
);

usersRouter.post(
  "/",
  requireAuth,
  requirePermission("settings", "canCreate"),
  async (req, res) => {
    const payload = createUserSchema.parse(req.body);
    const data = await usersService.create(payload);
    return res.status(201).json(ok(data, { requestId: req.requestId }));
  },
);

usersRouter.put(
  "/:id",
  requireAuth,
  requirePermission("settings", "canEdit"),
  async (req, res) => {
    const id = String(req.params.id);
    const payload = updateUserSchema.parse(req.body);
    const data = await usersService.update(id, payload);
    return res.json(ok(data, { requestId: req.requestId }));
  },
);

usersRouter.patch(
  "/:id/status",
  requireAuth,
  requirePermission("settings", "canEdit"),
  async (req, res) => {
    const id = String(req.params.id);
    const payload = updateUserStatusSchema.parse(req.body);
    const data = await usersService.updateStatus(id, payload.status);
    return res.json(ok(data, { requestId: req.requestId }));
  },
);

usersRouter.delete(
  "/:id",
  requireAuth,
  requirePermission("settings", "canDelete"),
  async (req, res) => {
    const id = String(req.params.id);
    const data = await usersService.remove(id);
    return res.json(ok(data, { requestId: req.requestId }));
  },
);
