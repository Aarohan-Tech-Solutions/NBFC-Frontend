import { adminApiClient } from "../../lib/apiClient";

export async function fetchDSAPartners() {
  const { data } = await adminApiClient.get("/dsa");
  return data;
}
