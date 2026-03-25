import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

/**
 * Provides auth state across the app.
 * `token` is persisted in localStorage — swap the login/logout logic
 * with your real API calls when the backend is ready.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ft_token') || null);

  /** Call this with the JWT/token returned by your API after login/signup */
  const login = useCallback((newToken) => {
    localStorage.setItem('ft_token', newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ft_token');
    setToken(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook — use inside any component to access auth state */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
