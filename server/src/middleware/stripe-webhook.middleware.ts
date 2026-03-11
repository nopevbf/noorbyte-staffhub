import type { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { env } from "../env.js";
import { fail } from "../utils/api-response.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2025-01-27.acacia",
});

/**
 * Memverifikasi signature webhook Stripe sebelum payload diproses.
 */
export function verifyStripeWebhookSignature(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const signature = req.headers["stripe-signature"];
  const rawBody = req.body as Buffer;

  if (!env.STRIPE_WEBHOOK_SECRET) {
    return res
      .status(503)
      .json(fail("STRIPE_CONFIG_ERROR", "Request could not be completed"));
  }

  if (typeof signature !== "string") {
    return res
      .status(400)
      .json(fail("INVALID_STRIPE_SIGNATURE", "Request could not be completed"));
  }

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    req.stripeEvent = event;

    return next();
  } catch {
    return res
      .status(400)
      .json(fail("INVALID_STRIPE_SIGNATURE", "Request could not be completed"));
  }
}
