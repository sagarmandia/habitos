import { create } from 'zustand';
import authService from '../services/authService';

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  // Helper action to set auth state
  setAuth: (user, token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({
      user,
      token,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    });
  },

  // Initialize auth state from local storage on client load
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      // Fetch profile to verify token integrity
      const response = await authService.getProfile();
      if (response && response.success) {
        set({
          user: response.data.user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        get().logout();
      }
    } catch (err) {
      console.error('Auth verification failed:', err);
      get().logout();
    }
  },

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(email, password);
      const { user, token } = response.data;
      get().setAuth(user, token);
      return response;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },

  // Register action
  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(name, email, password);
      const { user, token } = response.data;
      get().setAuth(user, token);
      return response;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },

  // Logout action
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  // Clear errors manually
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
