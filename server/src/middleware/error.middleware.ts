import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error.js";
import { fail } from "../utils/api-response.js";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json(fail(error.code, error.message, error.details));
  }

  if (error instanceof ZodError) {
    return res
      .status(400)
      .json(fail("VALIDATION_ERROR", "Invalid request", error.flatten()));
  }

  return res
    .status(500)
    .json(fail("INTERNAL_ERROR", "Unexpected server error"));
}
