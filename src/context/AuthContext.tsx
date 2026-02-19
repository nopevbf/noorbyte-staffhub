import { useEffect, useMemo, useState } from "react";
import {
  AUTH_EXPIRES_AT_KEY,
  AUTH_STORAGE_KEY,
  clearAuthSession,
  getAuthSession,
  setAuthSession,
} from "../auth/session";
import { AuthContext } from "./auth-context";
import type { AuthContextValue } from "./auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthSession);

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(getAuthSession());
    };

    const syncSession = (event: StorageEvent) => {
      if (
        event.key === AUTH_STORAGE_KEY ||
        event.key === AUTH_EXPIRES_AT_KEY ||
        event.key === null
      ) {
        syncAuthState();
      }
    };

    const syncOnVisibility = () => {
      if (document.visibilityState === "visible") {
        syncAuthState();
      }
    };

    const timer = window.setInterval(syncAuthState, 30_000);

    window.addEventListener("storage", syncSession);
    document.addEventListener("visibilitychange", syncOnVisibility);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("storage", syncSession);
      document.removeEventListener("visibilitychange", syncOnVisibility);
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login: () => {
        setAuthSession(true);
        setIsAuthenticated(true);
      },
      logout: () => {
        clearAuthSession();
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
