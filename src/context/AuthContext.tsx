import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchCurrentUser,
  loginWithEmail,
  logoutFromServer,
} from "../auth/api";
import { AuthContext } from "./auth-context";
import type { AuthContextValue } from "./auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] =
    useState<Awaited<ReturnType<typeof fetchCurrentUser>>>(null);

  const refreshSession = useCallback(async () => {
    const currentUser = await fetchCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(Boolean(currentUser));
  }, []);

  useEffect(() => {
    let disposed = false;

    const bootstrap = async () => {
      await refreshSession();
      if (!disposed) {
        setIsLoading(false);
      }
    };

    void bootstrap();

    const syncOnVisibility = async () => {
      if (document.visibilityState === "visible") {
        await refreshSession();
      }
    };

    const timer = window.setInterval(() => {
      void refreshSession();
    }, 30_000);

    document.addEventListener("visibilitychange", syncOnVisibility);

    return () => {
      disposed = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", syncOnVisibility);
    };
  }, [refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      login: async (email: string, password: string) => {
        const result = await loginWithEmail(email, password);

        if (!result.ok) {
          return {
            ok: false,
            message: result.message,
          };
        }

        await refreshSession();

        return { ok: true };
      },
      logout: async () => {
        await logoutFromServer();
        setUser(null);
        setIsAuthenticated(false);
      },
      refreshSession,
    }),
    [isAuthenticated, isLoading, refreshSession, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
