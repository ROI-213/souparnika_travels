import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = typeof window !== "undefined" && localStorage.getItem("st_admin_auth") === "true";
    if (isAuth) {
      setUser({ id: "admin", email: "admin@souparnikatravels.com" });
    }
  }, []);

  return { user, loading };
}

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = typeof window !== "undefined" && localStorage.getItem("st_admin_auth") === "true";
    setIsAdmin(isAuth);
  }, []);

  return { isAdmin, loading };
}
