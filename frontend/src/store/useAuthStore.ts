import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { apiFetch } from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiFetch<{ user: User; token: string }>("/login", {
            method: "POST",
            body: JSON.stringify(credentials),
          });

          Cookies.set("baksho-logged-in", "true", { expires: 7 });
          set({ 
            user: response.user, 
            token: response.token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiFetch<{ user: User; token: string }>("/register", {
            method: "POST",
            body: JSON.stringify(data),
          });

          Cookies.set("baksho-logged-in", "true", { expires: 7 });
          set({ 
            user: response.user, 
            token: response.token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        try {
          // Attempt graceful logout from API
          await apiFetch("/logout", { method: "POST" });
        } catch (err) {
          console.error("Logout ritual incomplete:", err);
        } finally {
          Cookies.remove("baksho-logged-in");
          set({ user: null, token: null, isAuthenticated: false, error: null });
          localStorage.removeItem("baksho-auth");
        }
      },

      fetchMe: async () => {
        const { token } = useAuthStore.getState();
        if (!token) return;

        set({ isLoading: true });
        try {
          const user = await apiFetch<User>("/me");
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (err) {
          // If profile fetch fails, logout locally
          set({ user: null, token: null, isAuthenticated: true, isLoading: false });
          Cookies.remove("baksho-logged-in");
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const updatedUser = await apiFetch<User>("/profile", {
            method: "PUT",
            body: JSON.stringify(data),
          });
          set({ user: updatedUser, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "baksho-auth",
      // Only persist user data and token
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
