import { useAuthStore } from "../stores/auth.store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    role,
    token,
    isAuthenticated: !!token,
    logout,
  };
}
