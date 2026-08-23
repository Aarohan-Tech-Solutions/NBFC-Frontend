import { AxiosInstance } from "axios";
import { Loan, LoanStatus } from "@nbfc/shared-types";

export function createLoansApi(client: AxiosInstance) {
  return {
    getLoans: async (params?: Record<string, unknown>): Promise<Loan[]> => {
      const { data } = await client.get<Loan[]>("/loans", { params });
      return data;
    },
    getLoanById: async (id: string): Promise<Loan> => {
      const { data } = await client.get<Loan>(`/loans/${id}`);
      return data;
    },
    createLoanApplication: async (payload: Partial<Loan>): Promise<Loan> => {
      const { data } = await client.post<Loan>("/loans", payload);
      return data;
    },
    updateLoanStatus: async (id: string, status: LoanStatus): Promise<Loan> => {
      const { data } = await client.patch<Loan>(`/loans/${id}/status`, { status });
      return data;
    },
  };
}
