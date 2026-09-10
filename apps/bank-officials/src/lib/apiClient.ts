import { createApiClient } from "@nbfc/api-client";
import { useOfficialAuthStore } from "../stores/auth.store";

export const officialApiClient = createApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  getToken: () => useOfficialAuthStore.getState().token,
  getRefreshToken: () => useOfficialAuthStore.getState().refreshToken,
  onTokenRefreshed: (newToken) => useOfficialAuthStore.getState().setToken(newToken),
  onLogout: () => useOfficialAuthStore.getState().logout(),
});
