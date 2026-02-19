declare global {
  namespace Express {
    interface Request {
      authUser?: {
        id: string;
        roleId?: string | null;
        status?: string;
      };
      authSession?: {
        id: string;
        expiresAt: string | Date;
      };
      requestId?: string;
    }
  }
}

export {};
