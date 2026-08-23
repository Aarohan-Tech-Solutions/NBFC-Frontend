import { adminApiClient } from "../../lib/apiClient";

export async function fetchDocuments() {
  const { data } = await adminApiClient.get("/documents");
  return data;
}
