import { AxiosInstance } from "axios";
import {
  ApiMode,
  OfficialDashboardMetrics,
  SanctionCalculationInput,
  SanctionCalculationResult,
  SanctionLetterData,
  RejectionPayload,
} from "@nbfc/shared-types";
import { mockDatabase } from "../mock/mockDatabase";
import { simulateDelay } from "../mock/mockAdapter";

export function createBankOfficialsApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getDashboardMetrics: async (branchId?: string): Promise<OfficialDashboardMetrics> => {
      if (mode === "mock") {
        return simulateDelay({
          totalAssignedFiles: mockDatabase.loans.length,
          pendingVerificationCount: mockDatabase.verificationTasks.filter((t) => t.status === "Pending" || t.status === "In Progress").length,
          underReviewCount: mockDatabase.loans.filter((l) => l.status === "under_review").length,
          sanctionedThisMonth: 14,
          disbursedThisMonth: 9,
          slaBreachedCount: 2,
          totalPortfolioValue: 185000000,
          averageTurnaroundDays: 3.4,
          categoryQueueBreakdown: {
            kyc: 4,
            financial: 6,
            property: 3,
            guarantor: 2,
          },
        });
      }
      const { data } = await client.get<OfficialDashboardMetrics>("/bank-officials/dashboard-metrics", {
        params: { branchId },
      });
      return data;
    },

    calculateSanction: (input: SanctionCalculationInput): SanctionCalculationResult => {
      const p = input.approvedAmount;
      const r = input.interestRate / 12 / 100;
      const n = input.tenureMonths;

      const emi = Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      const totalRepay = emi * n;
      const totalInterest = totalRepay - p;
      const procFee = Math.round((p * input.processingFeePercent) / 100);
      const gstProc = Math.round(procFee * 0.18);
      const netDisbursal = p - procFee - gstProc - input.insuranceFee;

      return {
        monthlyEmi: emi,
        totalInterestPayable: totalInterest,
        totalRepaymentAmount: totalRepay,
        processingFeeAmount: procFee,
        gstOnProcessingFee: gstProc,
        netDisbursalAmount: netDisbursal,
      };
    },

    generateSanctionLetter: async (
      input: SanctionCalculationInput,
      metadata?: { borrowerName: string; coBorrowerName?: string; appNo: string; loanProduct: string; officialName: string }
    ): Promise<SanctionLetterData> => {
      const calc = createBankOfficialsApi(client, mode).calculateSanction(input);
      const letterData: SanctionLetterData = {
        letterId: `SN-${Date.now()}`,
        sanctionDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
        borrowerName: metadata?.borrowerName || "Rahul Kapoor",
        coBorrowerName: metadata?.coBorrowerName || "Sunita Kapoor",
        applicationNo: metadata?.appNo || "LA-9485",
        loanProduct: metadata?.loanProduct || "Mortgage Loan (LAP)",
        sanctionedAmount: input.approvedAmount,
        interestRate: input.interestRate,
        tenureMonths: input.tenureMonths,
        monthlyEmi: calc.monthlyEmi,
        processingFee: calc.processingFeeAmount + calc.gstOnProcessingFee,
        insuranceAmount: input.insuranceFee,
        netDisbursal: calc.netDisbursalAmount,
        specialConditions: [
          "Original property title deeds and 30-year non-encumbrance certificate must be deposited prior to fund release.",
          "Post-dated cheques (PDCs) and NACH/e-Mandate registration for auto-debit of monthly EMI required.",
          "Property insurance cover with NBFC Arohon marked as primary loss payee.",
        ],
        sanctionedBy: {
          name: metadata?.officialName || "Dr. Anirban Mukherjee",
          designation: "Branch Underwriting Head & Credit Authority",
          employeeId: "EMP-CREDIT-008",
        },
      };

      if (mode === "mock") {
        const loan = mockDatabase.loans.find((l) => l.id === input.loanId || l.applicationNo === metadata?.appNo);
        if (loan) {
          loan.status = "sanctioned" as any;
          loan.sanctionedAmount = input.approvedAmount;
        }
        return simulateDelay(letterData);
      }

      const { data } = await client.post<SanctionLetterData>("/bank-officials/sanction/generate", {
        input,
        metadata,
      });
      return data;
    },

    rejectApplicationWithReason: async (payload: RejectionPayload): Promise<{ success: boolean; noticeId: string }> => {
      if (mode === "mock") {
        const loan = mockDatabase.loans.find((l) => l.id === payload.loanId || l.applicationNo === payload.loanId);
        if (loan) {
          loan.status = "rejected" as any;
        }
        return simulateDelay({
          success: true,
          noticeId: `ADVERSE-NOTICE-${Date.now()}`,
        });
      }
      const { data } = await client.post<{ success: boolean; noticeId: string }>(
        `/bank-officials/loans/${payload.loanId}/reject`,
        payload
      );
      return data;
    },
  };
}
