import { adminApiClient } from "../../lib/apiClient";

export async function fetchDisbursements() {
  const { data } = await adminApiClient.get("/disbursement");
  return data;
}
