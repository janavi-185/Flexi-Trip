import { create } from 'zustand';
import { apiFetch } from '../utils/api';

const TOKEN_KEY = 'flexitrip_auth_token';

function readToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
}

function saveToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}

const initialToken = readToken();

export const useAuthStore = create((set, get) => ({
  token: initialToken,
  user: null,
  isAuthenticated: Boolean(initialToken),
  isLoading: false,
  isCheckingSession: false,
  hasCheckedSession: false,
  error: null,

  clearError: () => set({ error: null }),

  register: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const result = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      const token = result?.data?.token;
      const user = result?.data?.user;

      if (!token || !user) {
        throw new Error('Invalid register response from server');
      }

      saveToken(token);
      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
        hasCheckedSession: true,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Registration failed',
      });
      throw error;
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const result = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const token = result?.data?.token;
      const user = result?.data?.user;

      if (!token || !user) {
        throw new Error('Invalid login response from server');
      }

      saveToken(token);
      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
        hasCheckedSession: true,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Login failed',
      });
      throw error;
    }
  },

  restoreSession: async () => {
    if (get().isCheckingSession || get().hasCheckedSession) {
      return;
    }

    const token = get().token || readToken();

    if (!token) {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        hasCheckedSession: true,
      });
      return;
    }

    set({ isCheckingSession: true, error: null });

    try {
      const result = await apiFetch('/api/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        token,
        user: result?.data || null,
        isAuthenticated: true,
        isCheckingSession: false,
        hasCheckedSession: true,
      });
    } catch {
      clearToken();
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isCheckingSession: false,
        hasCheckedSession: true,
      });
    }
  },

  logout: () => {
    clearToken();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,
      hasCheckedSession: true,
    });
  },
}));
