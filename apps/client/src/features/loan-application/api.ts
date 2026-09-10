import { loansApi } from "@nbfc/api-client";
import { Loan } from "@nbfc/shared-types";

export async function submitLoanApplication(payload: Partial<Loan>): Promise<Loan> {
  return loansApi.createLoanApplication(payload);
}
