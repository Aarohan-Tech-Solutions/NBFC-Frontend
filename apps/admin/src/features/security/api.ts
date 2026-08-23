import { adminApiClient } from "../../lib/apiClient";

export async function fetchAuditLogs() {
  const { data } = await adminApiClient.get("/security/audit-logs");
  return data;
}
