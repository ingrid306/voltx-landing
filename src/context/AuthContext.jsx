import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService.js";
import { setToken } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // hidrata sesión al arrancar

  // Al montar, intentamos recuperar el usuario con el token guardado.
  useEffect(() => {
    authService
      .fetchMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Devuelve { ok, error? }
  const register = useCallback(async (values) => {
    try {
      const u = await authService.register(values);
      setUser(u);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }, []);

  const login = useCallback(async (values) => {
    try {
      const u = await authService.login(values);
      setUser(u);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout(); // limpia el token del localStorage
    setToken(null);
    setUser(null);
  }, []);

  const value = { user, isAuthenticated: !!user, loading, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
