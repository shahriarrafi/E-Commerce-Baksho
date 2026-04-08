import { create } from "zustand";
import { persist } from "zustand/middleware";

import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        Cookies.set("baksho-logged-in", "true", { expires: 7 });
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        Cookies.remove("baksho-logged-in");
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("baksho-auth");
      },
    }),
    {
      name: "baksho-auth",
    }
  )
);
