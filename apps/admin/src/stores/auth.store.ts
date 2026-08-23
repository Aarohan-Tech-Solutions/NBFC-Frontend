import { create } from "zustand";
import { Role, User } from "@nbfc/shared-types";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  role: Role | null;
  setAuth: (user: User, token: string, refreshToken: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "admin-1",
    name: "Super Admin",
    email: "admin@nbfc.com",
    role: Role.SUPER_ADMIN,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  token: "placeholder-jwt-token",
  refreshToken: "placeholder-refresh-token",
  role: Role.SUPER_ADMIN,
  setAuth: (user, token, refreshToken) =>
    set({ user, token, refreshToken, role: user.role }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null, refreshToken: null, role: null }),
}));
