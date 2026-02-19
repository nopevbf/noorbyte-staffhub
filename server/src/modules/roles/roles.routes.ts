import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { requirePermission } from "../../middleware/rbac.middleware.js";
import { ok } from "../../utils/api-response.js";
import { rolesService } from "./roles.service.js";
import {
  roleInputSchema,
  rolePermissionPayloadSchema,
} from "./roles.validator.js";

export const rolesRouter = Router();

rolesRouter.get(
  "/",
  requireAuth,
  requirePermission("settings", "canView"),
  async (req, res) => {
    const data = await rolesService.list();
    return res.json(ok(data, { requestId: req.requestId }));
  },
);

rolesRouter.get(
  "/:id",
  requireAuth,
  requirePermission("settings", "canView"),
  async (req, res) => {
    const id = String(req.params.id);
    const data = await rolesService.getById(id);
    return res.json(ok(data, { requestId: req.requestId }));
  },
);

rolesRouter.post(
  "/",
  requireAuth,
  requirePermission("settings", "canCreate"),
  async (req, res) => {
    const payload = roleInputSchema.parse(req.body);
    const data = await rolesService.create(payload);
    return res.status(201).json(ok(data, { requestId: req.requestId }));
  },
);

rolesRouter.put(
  "/:id",
  requireAuth,
  requirePermission("settings", "canEdit"),
  async (req, res) => {
    const id = String(req.params.id);
    const payload = roleInputSchema.partial().parse(req.body);
    const data = await rolesService.update(id, payload);
    return res.json(ok(data, { requestId: req.requestId }));
  },
);

rolesRouter.put(
  "/:id/permissions",
  requireAuth,
  requirePermission("settings", "canEdit"),
  async (req, res) => {
    const id = String(req.params.id);
    const payload = rolePermissionPayloadSchema.parse(req.body);
    const data = await rolesService.upsertPermissions(id, payload.permissions);
    return res.json(ok(data, { requestId: req.requestId }));
  },
);

rolesRouter.delete(
  "/:id",
  requireAuth,
  requirePermission("settings", "canDelete"),
  async (req, res) => {
    const id = String(req.params.id);
    const data = await rolesService.remove(id);
    return res.json(ok(data, { requestId: req.requestId }));
  },
);
