export const AUTH_STORAGE_KEY = "staffhub_auth";
export const AUTH_EXPIRES_AT_KEY = "staffhub_auth_expires_at";
export const AUTH_SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function isExpired(expiresAt: number) {
  return Number.isNaN(expiresAt) || Date.now() >= expiresAt;
}

export function getAuthSession() {
  if (typeof window === "undefined") {
    return false;
  }

  const auth = localStorage.getItem(AUTH_STORAGE_KEY) === "true";

  if (!auth) {
    return false;
  }

  const expiresAtRaw = localStorage.getItem(AUTH_EXPIRES_AT_KEY);
  const expiresAt = Number(expiresAtRaw);

  if (isExpired(expiresAt)) {
    clearAuthSession();
    return false;
  }

  return true;
}

export function setAuthSession(isAuthenticated: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  if (!isAuthenticated) {
    clearAuthSession();
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, "true");
  localStorage.setItem(
    AUTH_EXPIRES_AT_KEY,
    String(Date.now() + AUTH_SESSION_TTL_MS),
  );
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_EXPIRES_AT_KEY);
}
