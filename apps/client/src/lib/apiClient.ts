import { createApiClient } from "@nbfc/api-client";
import { useCustomerAuthStore } from "../stores/auth.store";

export const clientPortalApiClient = createApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  getToken: () => useCustomerAuthStore.getState().token,
  onLogout: () => useCustomerAuthStore.getState().logout(),
});
