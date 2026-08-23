import { createApiClient } from "@nbfc/api-client";
import { useAuthStore } from "../stores/auth.store";

export const adminApiClient = createApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  getToken: () => useAuthStore.getState().token,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  onTokenRefreshed: (newToken) => useAuthStore.getState().setToken(newToken),
  onLogout: () => useAuthStore.getState().logout(),
});
