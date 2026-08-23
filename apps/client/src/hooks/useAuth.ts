import { useCustomerAuthStore } from "../stores/auth.store";

export function useCustomerAuth() {
  const customer = useCustomerAuthStore((state) => state.customer);
  const token = useCustomerAuthStore((state) => state.token);
  const logout = useCustomerAuthStore((state) => state.logout);

  return {
    customer,
    token,
    isAuthenticated: !!token,
    logout,
  };
}
