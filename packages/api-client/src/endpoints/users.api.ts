import { AxiosInstance } from "axios";
import { User } from "@nbfc/shared-types";

export function createUsersApi(client: AxiosInstance) {
  return {
    getUsers: async (params?: Record<string, unknown>): Promise<User[]> => {
      const { data } = await client.get<User[]>("/users", { params });
      return data;
    },
    getUserById: async (id: string): Promise<User> => {
      const { data } = await client.get<User>(`/users/${id}`);
      return data;
    },
    createUser: async (payload: Partial<User>): Promise<User> => {
      const { data } = await client.post<User>("/users", payload);
      return data;
    },
    updateUser: async (id: string, payload: Partial<User>): Promise<User> => {
      const { data } = await client.put<User>(`/users/${id}`, payload);
      return data;
    },
  };
}
