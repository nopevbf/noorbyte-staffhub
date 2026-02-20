export type PermissionFlags = {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  status: string;
  role: { id: string; name: string } | null;
  branch: { id: string; name: string } | null;
  permissions: Record<string, PermissionFlags>;
};

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error?: {
    code?: string;
    message?: string;
  };
};

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type ActionResult = {
  ok: boolean;
  message?: string;
};

type BetterAuthLikeResponse = {
  success?: boolean;
  status?: boolean;
  error?: {
    code?: string;
    message?: string;
  };
  message?: string;
};

function getAuthErrorMessage(
  payload: BetterAuthLikeResponse | null,
  fallback: string,
) {
  if (!payload) {
    return fallback;
  }

  if (payload.error?.message) {
    return payload.error.message;
  }

  if (payload.message) {
    return payload.message;
  }

  return fallback;
}

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const response = await fetch("/api/users/me", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const payload = await parseJsonSafe<ApiResponse<AuthUser>>(response);

    if (!payload || !payload.success) {
      return null;
    }

    return payload.data;
  } catch {
    return null;
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const response = await fetch("/api/auth/sign-in/email", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const payload = await parseJsonSafe<BetterAuthLikeResponse>(response);

    if (!response.ok) {
      return {
        ok: false,
        message: getAuthErrorMessage(payload, "Invalid credentials"),
      };
    }

    if (payload?.success === false || payload?.status === false) {
      return {
        ok: false,
        message: getAuthErrorMessage(payload, "Invalid credentials"),
      };
    }

    return { ok: true as const };
  } catch {
    return { ok: false, message: "Unable to connect. Please check your internet connection and try again." };
  }
}

export async function requestPasswordReset(
  email: string,
): Promise<ActionResult> {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      }),
    });

    const payload = await parseJsonSafe<BetterAuthLikeResponse>(response);

    if (!response.ok) {
      return {
        ok: false,
        message: getAuthErrorMessage(payload, "Failed to send reset link"),
      };
    }

    if (payload?.success === false || payload?.status === false) {
      return {
        ok: false,
        message: getAuthErrorMessage(payload, "Failed to send reset link"),
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, message: "Unable to connect. Please check your internet connection and try again." };
  }
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<ActionResult> {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword,
      }),
    });

    const payload = await parseJsonSafe<BetterAuthLikeResponse>(response);

    if (!response.ok) {
      return {
        ok: false,
        message: getAuthErrorMessage(payload, "Failed to reset password"),
      };
    }

    if (payload?.success === false || payload?.status === false) {
      return {
        ok: false,
        message: getAuthErrorMessage(payload, "Failed to reset password"),
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, message: "Unable to connect. Please check your internet connection and try again." };
  }
}

export async function logoutFromServer() {
  try {
    await fetch("/api/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Ignore network errors on logout
  }
}
