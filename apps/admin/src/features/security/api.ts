import { settingsApi } from "@nbfc/api-client";

export async function fetchSecurityAuditLogs() {
  return settingsApi.getAuditLogs();
}
