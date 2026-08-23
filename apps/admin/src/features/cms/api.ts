import { adminApiClient } from "../../lib/apiClient";

export async function fetchCMSContent() {
  const { data } = await adminApiClient.get("/cms/content");
  return data;
}
