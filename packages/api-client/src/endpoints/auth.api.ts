import { AxiosInstance } from "axios";
import { User, Role, ApiMode } from "@nbfc/shared-types";
import { mockDatabase } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface CustomerAuthResponse {
  customer: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    kycVerified: boolean;
  };
  token: string;
  refreshToken: string;
}

export function createAuthApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    login: async (credentials: { email?: string; role?: Role; password?: string }): Promise<AuthResponse> => {
      if (mode === "mock") {
        const targetRole = credentials.role || Role.SUPER_ADMIN;
        const user = mockDatabase.users.find((u) => u.role === targetRole) || mockDatabase.users[0];
        return simulateDelay({
          user,
          token: `mock-jwt-token-${user.role}`,
          refreshToken: `mock-refresh-token-${user.role}`,
        });
      }
      const { data } = await client.post<AuthResponse>("/auth/login", credentials);
      return data;
    },

    customerLogin: async (credentials: { phone?: string; otp?: string; email?: string }): Promise<CustomerAuthResponse> => {
      if (mode === "mock") {
        const customer = mockDatabase.customers[0];
        return simulateDelay({
          customer: {
            id: customer.id,
            fullName: customer.fullName,
            email: customer.email,
            phone: customer.phone,
            kycVerified: customer.kycVerified,
          },
          token: "mock-customer-jwt-token",
          refreshToken: "mock-customer-refresh-token",
        });
      }
      const { data } = await client.post<CustomerAuthResponse>("/auth/customer-login", credentials);
      return data;
    },

    logout: async (): Promise<void> => {
      if (mode === "mock") {
        return simulateDelay(undefined, 50);
      }
      await client.post("/auth/logout");
    },

    refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
      if (mode === "mock") {
        return simulateDelay({ token: "mock-new-refreshed-jwt-token" });
      }
      const { data } = await client.post<{ token: string }>("/auth/refresh", { refreshToken });
      return data;
    },

    getCurrentUser: async (): Promise<User> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.users[0]);
      }
      const { data } = await client.get<User>("/auth/me");
      return data;
    },
  };
}
