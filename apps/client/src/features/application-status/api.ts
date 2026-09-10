import { loansApi } from "@nbfc/api-client";

export async function fetchApplicationStatus(appNo: string) {
  return loansApi.getApplicationStatus(appNo);
}
