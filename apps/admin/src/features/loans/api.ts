import { loansApi } from "@nbfc/api-client";
import { Loan } from "@nbfc/shared-types";

export async function fetchLoans(): Promise<Loan[]> {
  return loansApi.getLoans();
}
