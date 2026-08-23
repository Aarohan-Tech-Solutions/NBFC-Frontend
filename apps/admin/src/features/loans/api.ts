import { adminApiClient } from "../../lib/apiClient";
import { Loan } from "@nbfc/shared-types";

export async function fetchLoans(): Promise<Loan[]> {
  const { data } = await adminApiClient.get<Loan[]>("/loans");
  return data;
}
