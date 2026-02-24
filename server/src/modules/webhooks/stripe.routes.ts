import { Router } from "express";
import { ok } from "../../utils/api-response.js";
import { verifyStripeWebhookSignature } from "../../middleware/stripe-webhook.middleware.js";

export const stripeWebhookRouter = Router();

stripeWebhookRouter.post(
  "/stripe",
  verifyStripeWebhookSignature,
  async (req, res) => {
    return res.status(200).json(
      ok(
        { received: true },
        {
          requestId: req.requestId,
        },
      ),
    );
  },
);
