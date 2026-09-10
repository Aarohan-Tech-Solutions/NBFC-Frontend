import { AxiosInstance } from "axios";
import { User, Role, ApiMode } from "@nbfc/shared-types";
import { mockDatabase } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createUsersApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getUsers: async (params?: Record<string, unknown>): Promise<User[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.users);
      }
      const { data } = await client.get<User[]>("/users", { params });
      return data;
    },

    getUserById: async (id: string): Promise<User> => {
      if (mode === "mock") {
        const user = mockDatabase.users.find((u) => u.id === id);
        if (!user) return simulateError("NOT_FOUND", `User ${id} not found`, 404);
        return simulateDelay(user);
      }
      const { data } = await client.get<User>(`/users/${id}`);
      return data;
    },

    createUser: async (payload: Partial<User>): Promise<User> => {
      if (mode === "mock") {
        const newUser: User = {
          id: `usr-${Date.now()}`,
          name: payload.name || "New Staff User",
          email: payload.email || "staff@nbfc.com",
          role: payload.role || Role.STAFF,
          phone: payload.phone || "+91 98000 00000",
          branchId: payload.branchId || "br-kol-01",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockDatabase.users.push(newUser);
        return simulateDelay(newUser);
      }
      const { data } = await client.post<User>("/users", payload);
      return data;
    },

    updateUser: async (id: string, payload: Partial<User>): Promise<User> => {
      if (mode === "mock") {
        const user = mockDatabase.users.find((u) => u.id === id);
        if (!user) return simulateError("NOT_FOUND", `User ${id} not found`, 404);
        Object.assign(user, payload, { updatedAt: new Date().toISOString() });
        return simulateDelay(user);
      }
      const { data } = await client.put<User>(`/users/${id}`, payload);
      return data;
    },
  };
}
