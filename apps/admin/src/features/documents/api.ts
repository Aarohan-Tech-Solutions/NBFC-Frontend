import { documentsApi } from "@nbfc/api-client";

export async function fetchDocuments() {
  return documentsApi.getDocuments();
}
