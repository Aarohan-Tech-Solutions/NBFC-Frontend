import { adminApiClient } from "../../lib/apiClient";

export async function fetchLeads() {
  const { data } = await adminApiClient.get("/leads");
  return data;
}
