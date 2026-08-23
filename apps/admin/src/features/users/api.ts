import { adminApiClient } from "../../lib/apiClient";
import { User } from "@nbfc/shared-types";

export async function fetchUsers(): Promise<User[]> {
  const { data } = await adminApiClient.get<User[]>("/users");
  return data;
}
