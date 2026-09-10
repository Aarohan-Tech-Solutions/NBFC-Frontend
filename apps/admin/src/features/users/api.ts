import { usersApi } from "@nbfc/api-client";
import { User } from "@nbfc/shared-types";

export async function fetchUsers(): Promise<User[]> {
  return usersApi.getUsers();
}
