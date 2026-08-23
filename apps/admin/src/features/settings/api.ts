import { adminApiClient } from "../../lib/apiClient";

export async function fetchSystemSettings() {
  const { data } = await adminApiClient.get("/settings");
  return data;
}
