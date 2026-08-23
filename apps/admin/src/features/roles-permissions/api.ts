import { adminApiClient } from "../../lib/apiClient";

export async function fetchRolePermissions() {
  const { data } = await adminApiClient.get("/roles-permissions");
  return data;
}
