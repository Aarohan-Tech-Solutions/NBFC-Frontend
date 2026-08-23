import { adminApiClient } from "../../lib/apiClient";

export async function fetchCRMLogs() {
  const { data } = await adminApiClient.get("/crm/logs");
  return data;
}
