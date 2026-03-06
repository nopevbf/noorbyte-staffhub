declare global {
  namespace Express {
    interface Request {
      authUser?: {
        id: string;
        roleId?: string | null;
        role?: string | null;
        status?: string;
      };
      authSession?: {
        id: string;
        expiresAt: string | Date;
      };
      stripeEvent?: unknown;
      requestId?: string;
    }
  }
}

export {};
