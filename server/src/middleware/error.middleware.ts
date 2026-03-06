import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error.js";
import { fail } from "../utils/api-response.js";
import { logger } from "../utils/logger.js";

function getGenericClientMessage(status: number) {
  if (status === 401) {
    return "Unauthorized";
  }

  if (status === 403) {
    return "Forbidden";
  }

  if (status === 404) {
    return "Resource not found";
  }

  if (status >= 500) {
    return "Unexpected server error";
  }

  return "Request could not be completed";
}

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ApiError) {
    logger.error("ApiError", {
      code: error.code,
      status: error.status,
      message: error.message,
      details: error.details,
      path: req.path,
      method: req.method,
      requestId: req.requestId,
    });

    return res
      .status(error.status)
      .json(fail(error.code, getGenericClientMessage(error.status)));
  }

  if (error instanceof ZodError) {
    logger.warn("ValidationError", {
      flattened: error.flatten(),
      path: req.path,
      method: req.method,
      requestId: req.requestId,
    });

    return res
      .status(400)
      .json(fail("VALIDATION_ERROR", "Request could not be completed"));
  }

  logger.error("UnhandledError", {
    path: req.path,
    method: req.method,
    requestId: req.requestId,
    error,
  });

  return res
    .status(500)
    .json(fail("INTERNAL_ERROR", "Unexpected server error"));
}
