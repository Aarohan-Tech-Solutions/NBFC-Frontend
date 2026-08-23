import { clientPortalApiClient } from "../../lib/apiClient";
import { Loan } from "@nbfc/shared-types";

export async function submitLoanApplication(payload: Partial<Loan>): Promise<Loan> {
  const { data } = await clientPortalApiClient.post<Loan>("/loans/apply", payload);
  return data;
}
