import { describe, it, expect } from "vitest";
import {
  createApiClient,
  getEffectiveApiMode,
  authApi,
  loansApi,
  verificationApi,
  disbursementApi,
  bankOfficialsApi,
  dsaApi,
  connectorsApi,
  leadsApi,
  commissionsApi,
  reportsApi,
  settingsApi,
  branchesApi,
  documentsApi,
  crmApi,
  ApiError,
} from "../index";
import {
  Role,
  LoanStatus,
  LoanType,
  VerificationCategory,
  VerificationStatus,
} from "@nbfc/shared-types";

describe("packages/api-client Test Suite", () => {
  describe("API Client Mode & Resolution", () => {
    it("should resolve client mode correctly", () => {
      expect(getEffectiveApiMode("mock")).toBe("mock");
      expect(getEffectiveApiMode("live")).toBe("live");
      expect(getEffectiveApiMode()).toBe("mock");
    });

    it("should instantiate client with custom baseURL and configuration", () => {
      const client = createApiClient({
        baseURL: "http://test.local/api/v1",
        timeout: 20000,
      });
      expect(client.defaults.baseURL).toBe("http://test.local/api/v1");
      expect(client.defaults.timeout).toBe(20000);
    });

    it("should format ApiError properly", () => {
      const err = new ApiError({
        code: "VALIDATION_FAILED",
        message: "Invalid PAN card format",
        status: 422,
        fieldErrors: { pan: ["PAN must be 10 characters alphanumeric"] },
      });
      expect(err.name).toBe("ApiError");
      expect(err.code).toBe("VALIDATION_FAILED");
      expect(err.status).toBe(422);
      expect(ApiError.isApiError(err)).toBe(true);
    });
  });

  describe("Authentication API (Mock Mode)", () => {
    it("should successfully log in a valid mock user", async () => {
      const res = await authApi.login({
        role: Role.SUPER_ADMIN,
      });

      expect(res.user.role).toBe(Role.SUPER_ADMIN);
      expect(res.token).toContain("mock-jwt-token");
      expect(res.refreshToken).toBeDefined();
    });

    it("should authenticate customer login", async () => {
      const res = await authApi.customerLogin({
        phone: "+91 99887 76655",
        otp: "123456",
      });

      expect(res.customer.fullName).toBe("Rahul Kapoor");
      expect(res.token).toContain("mock-customer-jwt-token");
    });

    it("should retrieve current authenticated user", async () => {
      const res = await authApi.getCurrentUser();
      expect(res.id).toBeDefined();
      expect(res.email).toBeDefined();
    });

    it("should refresh authentication token", async () => {
      const res = await authApi.refreshToken("old-token");
      expect(res.token).toBe("mock-new-refreshed-jwt-token");
    });
  });

  describe("Loans API (Mock Mode)", () => {
    it("should list loans with mock data", async () => {
      const loans = await loansApi.getLoans();
      expect(Array.isArray(loans)).toBe(true);
      expect(loans.length).toBeGreaterThan(0);
      expect(loans[0].applicationNo).toBeDefined();
    });

    it("should filter loans by status", async () => {
      const pendingLoans = await loansApi.getLoans({ status: LoanStatus.PENDING_VERIFICATION });
      expect(Array.isArray(pendingLoans)).toBe(true);
      pendingLoans.forEach((loan) => {
        expect(loan.status).toBe(LoanStatus.PENDING_VERIFICATION);
      });
    });

    it("should get loan details by ID", async () => {
      const loans = await loansApi.getLoans();
      const firstLoan = loans[0];

      const loan = await loansApi.getLoanById(firstLoan.id);
      expect(loan.id).toBe(firstLoan.id);
      expect(loan.applicationNo).toBe(firstLoan.applicationNo);
    });

    it("should create a new loan application", async () => {
      const newLoan = await loansApi.createLoanApplication({
        loanType: LoanType.PERSONAL,
        amount: 500000,
        tenureMonths: 36,
        customerId: "cust-1",
      });

      expect(newLoan.id).toBeDefined();
      expect(newLoan.amount).toBe(500000);
      expect(newLoan.status).toBe(LoanStatus.PENDING_VERIFICATION);
    });

    it("should update loan status", async () => {
      const loans = await loansApi.getLoans();
      const firstLoan = loans[0];

      const updated = await loansApi.updateLoanStatus(firstLoan.id, LoanStatus.UNDER_REVIEW);
      expect(updated.status).toBe(LoanStatus.UNDER_REVIEW);
    });
  });

  describe("Bank Officials & Underwriting Workflow (Mock Mode)", () => {
    it("should fetch official dashboard metrics", async () => {
      const metrics = await bankOfficialsApi.getDashboardMetrics();
      expect(metrics.totalAssignedFiles).toBeGreaterThan(0);
      expect(metrics.categoryQueueBreakdown).toBeDefined();
      expect(metrics.categoryQueueBreakdown.kyc).toBeGreaterThanOrEqual(0);
    });

    it("should calculate live sanction terms accurately", () => {
      const terms = bankOfficialsApi.calculateSanction({
        loanId: "LOAN-001",
        requestedAmount: 1000000,
        approvedAmount: 1000000,
        interestRate: 12.0,
        tenureMonths: 48,
        processingFeePercent: 1.5,
        insuranceFee: 5000,
        foirPercent: 45,
      });

      expect(terms.monthlyEmi).toBeGreaterThan(0);
      expect(terms.processingFeeAmount).toBe(15000);
      expect(terms.gstOnProcessingFee).toBe(2700);
      expect(terms.netDisbursalAmount).toBe(1000000 - 15000 - 2700 - 5000);
    });

    it("should generate a formal sanction letter", async () => {
      const letter = await bankOfficialsApi.generateSanctionLetter(
        {
          loanId: "LOAN-001",
          requestedAmount: 1000000,
          approvedAmount: 1000000,
          interestRate: 12.0,
          tenureMonths: 60,
          processingFeePercent: 1.5,
          insuranceFee: 4500,
          foirPercent: 40,
        },
        {
          borrowerName: "Rahul Kapoor",
          appNo: "LA-9485",
          loanProduct: "Home Loan",
          officialName: "Dr. Anirban Mukherjee",
        }
      );

      expect(letter.letterId).toMatch(/^SN-/);
      expect(letter.borrowerName).toBe("Rahul Kapoor");
      expect(letter.sanctionedAmount).toBe(1000000);
      expect(letter.specialConditions.length).toBeGreaterThan(0);
    });

    it("should record rejection with adverse action notice", async () => {
      const res = await bankOfficialsApi.rejectApplicationWithReason({
        loanId: "LOAN-002",
        reasonCode: "CIBIL_LOW_SCORE",
        reasonLabel: "Credit Assessment Low Score",
        officialRemarks: "CIBIL score below risk policy minimum threshold",
        adverseActionNoticeSent: true,
        rejectedBy: "Dr. Anirban Mukherjee",
        rejectedAt: new Date().toISOString(),
      });

      expect(res.success).toBe(true);
      expect(res.noticeId).toMatch(/^ADVERSE-NOTICE-/);
    });
  });

  describe("Verification API (Mock Mode)", () => {
    it("should list verification tasks", async () => {
      const tasks = await verificationApi.getVerificationTasks();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBeGreaterThan(0);
    });

    it("should submit a verification review", async () => {
      const tasks = await verificationApi.getVerificationTasks();
      const task = tasks[0];

      const res = await verificationApi.submitVerificationReview({
        taskId: task.id,
        loanId: task.loanId,
        category: VerificationCategory.KYC,
        status: VerificationStatus.VERIFIED,
        remarks: "Physical address and identity documents verified at premises.",
        verifiedBy: "Priya Sundaram",
      });

      expect(res.success).toBe(true);
      expect(res.task.status).toBe("Verified");
    });
  });

  describe("Disbursement API (Mock Mode)", () => {
    it("should list disbursements", async () => {
      const list = await disbursementApi.getDisbursements();
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(0);
    });

    it("should authorize disbursement with payment details", async () => {
      const res = await disbursementApi.authorizeDisbursement({
        loanId: "LOAN-001",
        sanctionedAmount: 1000000,
        deductions: {
          processingFee: 17700,
          insurance: 5000,
          documentationCharges: 1000,
        },
        netDisbursal: 975800,
        beneficiaryBank: "HDFC Bank",
        accountNumber: "50100987654321",
        ifsc: "HDFC0001234",
        accountHolder: "Rahul Kapoor",
        paymentMode: "RTGS",
        transactionId: "RTGS202609100001",
        authorizedBy: "Amitabh Sen",
      });

      expect(res.success).toBe(true);
      expect(res.record.status).toBe("Success");
      expect(res.record.txnId).toBe("RTGS202609100001");
    });
  });

  describe("Other Endpoints (DSA, Connectors, Leads, Commissions, Reports, Settings, Branches, CRM, Documents)", () => {
    it("should fetch DSA list", async () => {
      const dsas = await dsaApi.getDSAList();
      expect(Array.isArray(dsas)).toBe(true);
      expect(dsas.length).toBeGreaterThan(0);
    });

    it("should fetch connectors list", async () => {
      const conns = await connectorsApi.getConnectorsList();
      expect(Array.isArray(conns)).toBe(true);
      expect(conns.length).toBeGreaterThan(0);
    });

    it("should fetch leads list", async () => {
      const leads = await leadsApi.getLeads();
      expect(Array.isArray(leads)).toBe(true);
      expect(leads.length).toBeGreaterThan(0);
    });

    it("should fetch commissions list", async () => {
      const comms = await commissionsApi.getCommissions();
      expect(Array.isArray(comms)).toBe(true);
      expect(comms.length).toBeGreaterThan(0);
    });

    it("should fetch dashboard statistics", async () => {
      const stats = await reportsApi.getDashboardStats();
      expect(stats.totalDisbursedMonth).toBeGreaterThan(0);
      expect(stats.averageTATDays).toBeDefined();
    });

    it("should fetch company profile settings", async () => {
      const profile = await settingsApi.getCompanyProfile();
      expect(profile.companyName).toBeDefined();
      expect(profile.registrationNo).toBeDefined();
    });

    it("should fetch branch list", async () => {
      const branches = await branchesApi.getBranches();
      expect(Array.isArray(branches)).toBe(true);
      expect(branches.length).toBeGreaterThan(0);
    });

    it("should fetch CRM logs", async () => {
      const logs = await crmApi.getLogs();
      expect(Array.isArray(logs)).toBe(true);
    });

    it("should list documents", async () => {
      const docs = await documentsApi.getDocuments();
      expect(Array.isArray(docs)).toBe(true);
    });
  });
});
