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

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
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
}

export async function loginWithEmail(email: string, password: string) {
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

  const payload = await parseJsonSafe<ApiResponse<unknown>>(response);

  if (!response.ok || !payload || !payload.success) {
    return {
      ok: false,
      message:
        payload && !payload.success
          ? (payload.error?.message ?? "Invalid credentials")
          : "Invalid credentials",
    };
  }

  return { ok: true as const };
}

export async function requestPasswordReset(
  email: string,
): Promise<ActionResult> {
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

  const payload = await parseJsonSafe<ApiResponse<unknown>>(response);

  if (!response.ok || !payload || !payload.success) {
    return {
      ok: false,
      message:
        payload && !payload.success
          ? (payload.error?.message ?? "Failed to send reset link")
          : "Failed to send reset link",
    };
  }

  return { ok: true };
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<ActionResult> {
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

  const payload = await parseJsonSafe<ApiResponse<unknown>>(response);

  if (!response.ok || !payload || !payload.success) {
    return {
      ok: false,
      message:
        payload && !payload.success
          ? (payload.error?.message ?? "Failed to reset password")
          : "Failed to reset password",
    };
  }

  return { ok: true };
}

export async function logoutFromServer() {
  await fetch("/api/auth/sign-out", {
    method: "POST",
    credentials: "include",
  });
}
