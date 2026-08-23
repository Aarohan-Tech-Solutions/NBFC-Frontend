import { adminApiClient } from "../../lib/apiClient";

export async function fetchAreas() {
  const { data } = await adminApiClient.get("/areas");
  return data;
}
