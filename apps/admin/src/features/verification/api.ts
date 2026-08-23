import { adminApiClient } from "../../lib/apiClient";

export async function fetchVerificationQueue() {
  const { data } = await adminApiClient.get("/verification/queue");
  return data;
}
