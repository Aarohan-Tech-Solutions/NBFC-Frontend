import { AxiosInstance } from "axios";
import { User } from "@nbfc/shared-types";

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export function createAuthApi(client: AxiosInstance) {
  return {
    login: async (credentials: Record<string, unknown>): Promise<AuthResponse> => {
      const { data } = await client.post<AuthResponse>("/auth/login", credentials);
      return data;
    },
    logout: async (): Promise<void> => {
      await client.post("/auth/logout");
    },
    refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
      const { data } = await client.post<{ token: string }>("/auth/refresh", { refreshToken });
      return data;
    },
    getCurrentUser: async (): Promise<User> => {
      const { data } = await client.get<User>("/auth/me");
      return data;
    },
  };
}
