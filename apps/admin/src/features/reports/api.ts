import { adminApiClient } from "../../lib/apiClient";

export async function fetchReports() {
  const { data } = await adminApiClient.get("/reports");
  return data;
}
