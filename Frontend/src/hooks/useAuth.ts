import { useState, useEffect } from "react";

export function useAuth() {
  const [auth, setAuth] = useState<any | null>(null);

  const logout = () => {
    setAuth(null); // Reset authentication state to null
    localStorage.removeItem("authToken")
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuth(token); // Set auth state if token exists
    }
  }, []);

  return { auth, logout };
}