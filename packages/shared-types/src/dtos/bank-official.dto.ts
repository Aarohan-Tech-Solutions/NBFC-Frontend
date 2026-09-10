import { LoanStatus, LoanType } from "../enums/loans.enum";
import { VerificationCategory, VerificationStatus } from "../enums/verification.enum";
import { EmploymentType } from "../config/loanDocuments.config";

export type SLARiskLevel = "normal" | "warning" | "breached";

export interface SLAAgeingMetric {
  hoursElapsed: number;
  slaLimitHours: number;
  riskLevel: SLARiskLevel;
  formattedTime: string;
}

export interface BankOfficialProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  roleLabel: string;
  branchId: string;
  branchName: string;
  sanctionLimit: number;
  phone: string;
  avatarText: string;
}

export interface OfficialDashboardMetrics {
  totalAssignedFiles: number;
  pendingVerificationCount: number;
  underReviewCount: number;
  sanctionedThisMonth: number;
  disbursedThisMonth: number;
  slaBreachedCount: number;
  totalPortfolioValue: number;
  averageTurnaroundDays: number;
  categoryQueueBreakdown: {
    kyc: number;
    financial: number;
    property: number;
    guarantor: number;
  };
}

export interface SanctionCalculationInput {
  loanId: string;
  requestedAmount: number;
  approvedAmount: number;
  interestRate: number;
  tenureMonths: number;
  processingFeePercent: number;
  insuranceFee: number;
  foirPercent: number;
  ltvPercent?: number;
}

export interface SanctionCalculationResult {
  monthlyEmi: number;
  totalInterestPayable: number;
  totalRepaymentAmount: number;
  processingFeeAmount: number;
  gstOnProcessingFee: number;
  netDisbursalAmount: number;
}

export interface SanctionLetterData {
  letterId: string;
  sanctionDate: string;
  validUntil: string;
  borrowerName: string;
  coBorrowerName?: string;
  applicationNo: string;
  loanProduct: string;
  sanctionedAmount: number;
  interestRate: number;
  tenureMonths: number;
  monthlyEmi: number;
  processingFee: number;
  insuranceAmount: number;
  netDisbursal: number;
  specialConditions: string[];
  sanctionedBy: {
    name: string;
    designation: string;
    employeeId: string;
  };
}

export type RejectionReasonCode =
  | "CIBIL_LOW_SCORE"
  | "OVERLEVERAGED_FOIR"
  | "PROPERTY_TITLE_DEFECT"
  | "FORGED_FAKE_DOCUMENTS"
  | "INSUFFICIENT_INCOME"
  | "NEGATIVE_FIELD_REPORT"
  | "AGE_CRITERIA_MISMATCH"
  | "UNVERIFIED_EMPLOYMENT"
  | "BORROWER_NON_COOPERATION"
  | "OTHER_RISK_POLICY";

export interface RejectionPayload {
  loanId: string;
  reasonCode: RejectionReasonCode;
  reasonLabel: string;
  officialRemarks: string;
  adverseActionNoticeSent: boolean;
  rejectedBy: string;
  rejectedAt: string;
}

export interface DisbursementAuthorizationInput {
  loanId: string;
  sanctionedAmount: number;
  deductions: {
    processingFee: number;
    insurance: number;
    documentationCharges: number;
    advanceEmi?: number;
  };
  netDisbursal: number;
  beneficiaryBank: string;
  accountNumber: string;
  ifsc: string;
  accountHolder: string;
  paymentMode: "RTGS" | "NEFT" | "IMPS";
  transactionId: string;
  authorizedBy: string;
}

export interface VerificationReviewInput {
  taskId: string;
  loanId: string;
  category: VerificationCategory;
  status: VerificationStatus;
  remarks: string;
  verifiedBy: string;
  checklistState?: Record<string, boolean>;
  fieldFindings?: string;
}
