import { crmApi } from "@nbfc/api-client";

export async function fetchCRMLogs() {
  return crmApi.getLogs();
}
