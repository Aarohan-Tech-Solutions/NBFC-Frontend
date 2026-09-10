import { disbursementApi } from "@nbfc/api-client";

export async function fetchDisbursements() {
  return disbursementApi.getDisbursements();
}
