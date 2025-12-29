import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

// Initial state - always start with empty state to avoid hydration issues
const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;

      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    // Hydrate auth state from localStorage (client-side only)
    hydrateAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        if (token && user) {
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { loginSuccess, logout, updateUser, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
