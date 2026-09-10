import { AxiosInstance } from "axios";
import { Loan, LoanStatus, ApiMode } from "@nbfc/shared-types";
import { mockDatabase } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createLoansApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getLoans: async (params?: Record<string, unknown>): Promise<Loan[]> => {
      if (mode === "mock") {
        let results = [...mockDatabase.loans];
        if (params?.status && params.status !== "all") {
          results = results.filter((l) => l.status === params.status);
        }
        if (params?.search) {
          const q = String(params.search).toLowerCase();
          results = results.filter(
            (l) =>
              l.applicationNo.toLowerCase().includes(q) ||
              l.customerName.toLowerCase().includes(q) ||
              l.customerPhone.includes(q)
          );
        }
        return simulateDelay(results);
      }
      const { data } = await client.get<Loan[]>("/loans", { params });
      return data;
    },

    getLoanById: async (id: string): Promise<any> => {
      if (mode === "mock") {
        const loan = mockDatabase.loans.find((l) => l.id === id || l.applicationNo === id);
        if (!loan) {
          return simulateError("NOT_FOUND", `Loan with identifier ${id} not found`, 404);
        }
        return simulateDelay(loan);
      }
      const { data } = await client.get<Loan>(`/loans/${id}`);
      return data;
    },

    getApplicationStatus: async (appNo: string): Promise<any> => {
      if (mode === "mock") {
        const loan = mockDatabase.loans.find((l) => l.applicationNo.toUpperCase() === appNo.toUpperCase()) || mockDatabase.loans[0];
        return simulateDelay({
          applicationNo: loan.applicationNo,
          customerName: loan.customerName,
          loanType: loan.loanType,
          amount: loan.amount,
          status: loan.status,
          submittedAt: loan.submittedAt,
          updatedAt: loan.updatedAt,
          timeline: [
            { stage: "Submitted", date: loan.submittedAt, completed: true },
            { stage: "KYC & Verification", date: "14 Aug 2026", completed: loan.status !== LoanStatus.SUBMITTED },
            { stage: "Underwriting & Approval", date: "15 Aug 2026", completed: [LoanStatus.APPROVED, LoanStatus.SANCTIONED, LoanStatus.DISBURSED].includes(loan.status) },
            { stage: "Sanction Letter Issued", date: "16 Aug 2026", completed: [LoanStatus.SANCTIONED, LoanStatus.DISBURSED].includes(loan.status) },
            { stage: "Disbursement", date: "Pending", completed: loan.status === LoanStatus.DISBURSED },
          ],
        });
      }
      const { data } = await client.get(`/customer/applications/${appNo}/status`);
      return data;
    },

    createLoanApplication: async (payload: Partial<Loan> & Record<string, any>): Promise<Loan> => {
      if (mode === "mock") {
        const newLoan: any = {
          id: `loan-${Date.now()}`,
          applicationNo: `LA-${Math.floor(1000 + Math.random() * 9000)}`,
          customerId: payload.customerId || "cust-1",
          customerName: payload.fullName || payload.customerName || "Rahul Kapoor",
          customerPhone: payload.phone || payload.customerPhone || "+91 99887 76655",
          customerEmail: payload.email || payload.customerEmail || "customer@example.com",
          loanType: payload.loanType || payload.loanProduct || "personal",
          status: LoanStatus.PENDING_VERIFICATION,
          amount: Number(payload.amount || payload.loanAmount || 500000),
          tenureMonths: Number(payload.tenureMonths || payload.tenure || 36),
          interestRate: 10.5,
          employmentType: payload.employmentType || "salaried",
          monthlyIncome: Number(payload.monthlyIncome || 80000),
          cibilScore: 720,
          submittedAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          slaHoursElapsed: 1,
          priority: "Normal",
        };
        mockDatabase.loans.unshift(newLoan);
        return simulateDelay(newLoan);
      }
      const { data } = await client.post<Loan>("/loans", payload);
      return data;
    },

    updateLoanStatus: async (id: string, status: LoanStatus): Promise<Loan> => {
      if (mode === "mock") {
        const loan = mockDatabase.loans.find((l) => l.id === id || l.applicationNo === id);
        if (!loan) {
          return simulateError("NOT_FOUND", `Loan ${id} not found`, 404);
        }
        loan.status = status;
        loan.updatedAt = new Date().toISOString();
        return simulateDelay(loan);
      }
      const { data } = await client.patch<Loan>(`/loans/${id}/status`, { status });
      return data;
    },
  };
}
