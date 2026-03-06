import { z } from "zod";

export const roleInputSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
});

export const rolePermissionItemSchema = z.object({
  module: z.string().min(2).max(50),
  canView: z.boolean(),
  canCreate: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  canExport: z.boolean(),
});

export const rolePermissionPayloadSchema = z.object({
  permissions: z.array(rolePermissionItemSchema).min(1),
});
