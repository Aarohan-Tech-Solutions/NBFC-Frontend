import { adminApiClient } from "../../lib/apiClient";

export async function fetchBranches() {
  const { data } = await adminApiClient.get("/branches");
  return data;
}
