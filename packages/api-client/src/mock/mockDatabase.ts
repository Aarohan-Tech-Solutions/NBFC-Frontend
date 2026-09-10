import {
  Loan,
  LoanStatus,
  LoanType,
  Role,
  User,
  Customer,
  Commission,
  OfficialDashboardMetrics,
  SanctionLetterData,
  DisbursementAuthorizationInput,
} from "@nbfc/shared-types";

export interface MockVerificationTask {
  id: string;
  appNo: string;
  loanId: string;
  customerName: string;
  loanProduct: string;
  employmentType: "salaried" | "self_employed" | "business_owner";
  amount: number;
  category: "KYC" | "Document" | "Bank" | "Property" | "Guarantor";
  taskTitle: string;
  assignedOfficer: string;
  priority: "High" | "Medium" | "Normal";
  status: "Pending" | "In Progress" | "Verified" | "Action Required" | "Rejected";
  remarks: string;
  dueDate: string;
  coApplicantName?: string;
  coApplicantRelationship?: string;
  checklistState?: Record<string, boolean>;
}

export interface MockDisbursementRecord {
  id: string;
  appNo: string;
  loanId: string;
  customerName: string;
  customerPhone: string;
  loanProduct: string;
  sanctionedAmount: number;
  processingFee: number;
  insuranceFee: number;
  netDisbursal: number;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountHolder: string;
  txnId: string;
  paymentMode: "RTGS" | "NEFT" | "IMPS";
  status: "Pending" | "Initiated" | "Success" | "Failed";
  disbursedDate: string;
}

export interface MockLead {
  id: string;
  leadNo: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  loanType: LoanType;
  expectedAmount: number;
  source: "website" | "dsa" | "connector" | "manual";
  sourceName?: string;
  status: "new" | "contacted" | "qualified" | "in_progress" | "converted" | "lost";
  assignedTo: string;
  createdAt: string;
}

export interface MockDSA {
  id: string;
  code: string;
  agencyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  branchName: string;
  activeConnectors: number;
  totalDisbursed: number;
  commissionEarned: number;
  status: "active" | "pending_kyc" | "suspended";
}

export interface MockConnector {
  id: string;
  code: string;
  name: string;
  dsaName: string;
  phone: string;
  email: string;
  leadsReferred: number;
  convertedLoans: number;
  commissionPaid: number;
  status: "active" | "inactive";
}

export interface MockBranch {
  id: string;
  branchCode: string;
  branchName: string;
  areaName: string;
  managerName: string;
  underwritingHeadName: string;
  activeDSAs: number;
  monthlyDisbursed: number;
  phone: string;
  status: "active" | "inactive";
}

export interface MockArea {
  id: string;
  areaCode: string;
  areaName: string;
  state: string;
  areaManagerName: string;
  totalBranches: number;
  totalDisbursalYTD: number;
}

export interface MockAuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  ipAddress: string;
  status: "success" | "warning" | "failed";
}

class MockDatabase {
  public users: User[] = [
    {
      id: "usr-admin-1",
      name: "Allie Grater",
      email: "allie.admin@nbfc.com",
      role: Role.SUPER_ADMIN,
      phone: "+91 98300 00001",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2026-08-23T00:00:00.000Z",
    },
    {
      id: "usr-credit-1",
      name: "Debashis Banerjee",
      email: "debashis.credit@nbfc.com",
      role: Role.SENIOR_CREDIT_OFFICER,
      phone: "+91 98301 22334",
      branchId: "br-kol-01",
      createdAt: "2024-02-01T00:00:00.000Z",
      updatedAt: "2026-08-23T00:00:00.000Z",
    },
    {
      id: "usr-verif-1",
      name: "Priya Sundaram",
      email: "priya.sundaram@nbfc.com",
      role: Role.VERIFICATION_OFFICER,
      phone: "+91 98203 45678",
      branchId: "br-kol-01",
      createdAt: "2024-03-01T00:00:00.000Z",
      updatedAt: "2026-08-23T00:00:00.000Z",
    },
    {
      id: "usr-disb-1",
      name: "Amitabh Sen",
      email: "amitabh.disb@nbfc.com",
      role: Role.DISBURSEMENT_OFFICER,
      phone: "+91 98302 99887",
      branchId: "br-kol-01",
      createdAt: "2024-04-01T00:00:00.000Z",
      updatedAt: "2026-08-23T00:00:00.000Z",
    },
    {
      id: "usr-head-1",
      name: "Dr. Anirban Mukherjee",
      email: "anirban.head@nbfc.com",
      role: Role.BRANCH_UNDERWRITING_HEAD,
      phone: "+91 98300 77665",
      branchId: "br-kol-01",
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: "2026-08-23T00:00:00.000Z",
    },
    {
      id: "usr-bm-1",
      name: "Subhashis Roy",
      email: "subhashis.roy@nbfc.com",
      role: Role.BRANCH_MANAGER,
      phone: "+91 98302 34567",
      branchId: "br-kol-01",
      createdAt: "2024-04-01T00:00:00.000Z",
      updatedAt: "2026-08-23T00:00:00.000Z",
    },
  ];

  public customers: Customer[] = [
    {
      id: "cust-1",
      fullName: "Rahul Kapoor",
      email: "rahul.kapoor@example.com",
      phone: "+91 99887 76655",
      panNumber: "ABCDE1234F",
      aadhaarNumber: "9876-5432-1098",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700001",
      kycVerified: true,
      createdAt: "2024-05-10T10:00:00.000Z",
      updatedAt: "2026-08-23T10:00:00.000Z",
    },
    {
      id: "cust-2",
      fullName: "Meenakshi Sen",
      email: "meenakshi.sen@example.com",
      phone: "+91 98301 44556",
      panNumber: "FGHIJ5678K",
      aadhaarNumber: "4567-8901-2345",
      city: "Salt Lake, Kolkata",
      state: "West Bengal",
      pincode: "700091",
      kycVerified: true,
      createdAt: "2024-06-12T10:00:00.000Z",
      updatedAt: "2026-08-23T10:00:00.000Z",
    },
    {
      id: "cust-3",
      fullName: "Rajeshwar Patel",
      email: "rajeshwar.patel@patelengg.com",
      phone: "+91 98250 11223",
      panNumber: "KLMNO9012P",
      aadhaarNumber: "1234-5678-9012",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001",
      kycVerified: true,
      createdAt: "2024-07-01T10:00:00.000Z",
      updatedAt: "2026-08-23T10:00:00.000Z",
    },
    {
      id: "cust-4",
      fullName: "Arun Nair",
      email: "arun.nair@techcorp.in",
      phone: "+91 98490 66778",
      panNumber: "PQRST3456U",
      aadhaarNumber: "6789-0123-4567",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      kycVerified: true,
      createdAt: "2024-08-01T10:00:00.000Z",
      updatedAt: "2026-08-23T10:00:00.000Z",
    },
    {
      id: "cust-5",
      fullName: "Sunita Choudhury",
      email: "sunita.c@retailmart.com",
      phone: "+91 98311 88776",
      panNumber: "UVWXYZ7890A",
      aadhaarNumber: "3456-7890-1234",
      city: "Howrah",
      state: "West Bengal",
      pincode: "711101",
      kycVerified: false,
      createdAt: "2024-08-15T10:00:00.000Z",
      updatedAt: "2026-08-23T10:00:00.000Z",
    },
  ];

  public loans: (Loan & {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    employmentType: "salaried" | "self_employed" | "business_owner";
    monthlyIncome: number;
    cibilScore: number;
    dsaName?: string;
    connectorName?: string;
    coApplicantName?: string;
    coApplicantRelationship?: string;
    propertyValuation?: number;
    vehicleModel?: string;
    submittedAt: string;
    sanctionedAmount?: number;
    slaHoursElapsed: number;
    priority: "High" | "Medium" | "Normal";
  })[] = [
    {
      id: "loan-1",
      applicationNo: "LA-9485",
      customerId: "cust-1",
      customerName: "Rahul Kapoor",
      customerPhone: "+91 99887 76655",
      customerEmail: "rahul.kapoor@example.com",
      loanType: LoanType.HOME,
      status: LoanStatus.SANCTIONED,
      amount: 4500000,
      sanctionedAmount: 4500000,
      tenureMonths: 240,
      interestRate: 8.75,
      employmentType: "salaried",
      monthlyIncome: 185000,
      cibilScore: 785,
      dsaId: "dsa-1",
      dsaName: "Apex Financial Solutions (DSA-1042)",
      coApplicantName: "Sunita Kapoor",
      coApplicantRelationship: "Spouse & Co-Owner",
      propertyValuation: 6500000,
      branchId: "br-kol-01",
      priority: "High",
      slaHoursElapsed: 18,
      submittedAt: "12 Aug 2026, 10:30 AM",
      createdAt: "2026-08-12T05:00:00.000Z",
      updatedAt: "2026-08-16T10:30:00.000Z",
    },
    {
      id: "loan-2",
      applicationNo: "LA-9486",
      customerId: "cust-2",
      customerName: "Meenakshi Sen",
      customerPhone: "+91 98301 44556",
      customerEmail: "meenakshi.sen@example.com",
      loanType: LoanType.MORTGAGE,
      status: LoanStatus.UNDER_REVIEW,
      amount: 2500000,
      sanctionedAmount: 2500000,
      tenureMonths: 180,
      interestRate: 9.8,
      employmentType: "self_employed",
      monthlyIncome: 110000,
      cibilScore: 742,
      dsaId: "dsa-1",
      dsaName: "Apex Financial Solutions (DSA-1042)",
      coApplicantName: "Subrata Sen",
      coApplicantRelationship: "Father & Co-Applicant",
      propertyValuation: 4200000,
      branchId: "br-kol-01",
      priority: "Medium",
      slaHoursElapsed: 32,
      submittedAt: "13 Aug 2026, 02:15 PM",
      createdAt: "2026-08-13T08:45:00.000Z",
      updatedAt: "2026-08-16T11:00:00.000Z",
    },
    {
      id: "loan-3",
      applicationNo: "LA-9487",
      customerId: "cust-3",
      customerName: "Rajeshwar Patel",
      customerPhone: "+91 98250 11223",
      customerEmail: "rajeshwar.patel@patelengg.com",
      loanType: LoanType.BUSINESS,
      status: LoanStatus.APPROVED,
      amount: 3500000,
      sanctionedAmount: 3500000,
      tenureMonths: 60,
      interestRate: 12.5,
      employmentType: "business_owner",
      monthlyIncome: 275000,
      cibilScore: 760,
      connectorId: "con-1",
      connectorName: "Sunil Sen (CON-312)",
      branchId: "br-kol-01",
      priority: "High",
      slaHoursElapsed: 22,
      submittedAt: "14 Aug 2026, 11:00 AM",
      createdAt: "2026-08-14T05:30:00.000Z",
      updatedAt: "2026-08-16T09:15:00.000Z",
    },
    {
      id: "loan-4",
      applicationNo: "LA-9488",
      customerId: "cust-4",
      customerName: "Arun Nair",
      customerPhone: "+91 98490 66778",
      customerEmail: "arun.nair@techcorp.in",
      loanType: LoanType.CAR,
      status: LoanStatus.PENDING_VERIFICATION,
      amount: 1200000,
      tenureMonths: 84,
      interestRate: 8.9,
      employmentType: "salaried",
      monthlyIncome: 95000,
      cibilScore: 715,
      vehicleModel: "Hyundai Creta SX (O) Diesel 2026",
      branchId: "br-kol-01",
      priority: "Normal",
      slaHoursElapsed: 44,
      submittedAt: "15 Aug 2026, 04:30 PM",
      createdAt: "2026-08-15T11:00:00.000Z",
      updatedAt: "2026-08-16T12:00:00.000Z",
    },
    {
      id: "loan-5",
      applicationNo: "LA-9489",
      customerId: "cust-5",
      customerName: "Sunita Choudhury",
      customerPhone: "+91 98311 88776",
      customerEmail: "sunita.c@retailmart.com",
      loanType: LoanType.PERSONAL,
      status: LoanStatus.PENDING_VERIFICATION,
      amount: 500000,
      tenureMonths: 36,
      interestRate: 11.25,
      employmentType: "self_employed",
      monthlyIncome: 65000,
      cibilScore: 680,
      branchId: "br-kol-01",
      priority: "Normal",
      slaHoursElapsed: 12,
      submittedAt: "16 Aug 2026, 09:00 AM",
      createdAt: "2026-08-16T03:30:00.000Z",
      updatedAt: "2026-08-16T09:00:00.000Z",
    },
    {
      id: "loan-6",
      applicationNo: "LA-9490",
      customerId: "cust-1",
      customerName: "Rahul Kapoor",
      customerPhone: "+91 99887 76655",
      customerEmail: "rahul.kapoor@example.com",
      loanType: LoanType.PERSONAL,
      status: LoanStatus.DISBURSED,
      amount: 800000,
      sanctionedAmount: 800000,
      tenureMonths: 48,
      interestRate: 10.5,
      employmentType: "salaried",
      monthlyIncome: 185000,
      cibilScore: 785,
      branchId: "br-kol-01",
      priority: "Normal",
      slaHoursElapsed: 0,
      submittedAt: "01 Aug 2026, 11:00 AM",
      createdAt: "2026-08-01T05:30:00.000Z",
      updatedAt: "2026-08-05T14:30:00.000Z",
    },
  ];

  public verificationTasks: MockVerificationTask[] = [
    {
      id: "vtask-1",
      appNo: "LA-9485",
      loanId: "loan-1",
      customerName: "Rahul Kapoor",
      loanProduct: "Home Loan",
      employmentType: "salaried",
      amount: 4500000,
      category: "Property",
      taskTitle: "Property Legal Search & 30-Yr Title Valuation",
      assignedOfficer: "Advocate P. Sharma / Valuer M. Kulkarni",
      priority: "High",
      status: "Verified",
      remarks: "Clear 30-year title with no encumbrance. Fair market valuation ₹ 65 Lakhs.",
      dueDate: "14 Aug 2026",
      coApplicantName: "Sunita Kapoor",
      coApplicantRelationship: "Spouse & Co-Owner",
    },
    {
      id: "vtask-2",
      appNo: "LA-9486",
      loanId: "loan-2",
      customerName: "Meenakshi Sen",
      loanProduct: "Mortgage Loan",
      employmentType: "self_employed",
      amount: 2500000,
      category: "Bank",
      taskTitle: "Salary Inflow & Banking Analysis (12-Mo Statement)",
      assignedOfficer: "Debashis Banerjee",
      priority: "High",
      status: "In Progress",
      remarks: "Average monthly inflow ₹1.10L. Healthy average quarterly balance with zero EMI bounces.",
      dueDate: "16 Aug 2026",
    },
    {
      id: "vtask-3",
      appNo: "LA-9487",
      loanId: "loan-3",
      customerName: "Rajeshwar Patel",
      loanProduct: "Business Loan",
      employmentType: "business_owner",
      amount: 3500000,
      category: "KYC",
      taskTitle: "Business Entity & MSME Udyam On-Site Verification",
      assignedOfficer: "Priya Sundaram",
      priority: "Medium",
      status: "Verified",
      remarks: "Manufacturing unit in Naroda Industrial Area inspected. Machinery active and audited.",
      dueDate: "15 Aug 2026",
    },
    {
      id: "vtask-4",
      appNo: "LA-9488",
      loanId: "loan-4",
      customerName: "Arun Nair",
      loanProduct: "Car Loan",
      employmentType: "salaried",
      amount: 1200000,
      category: "Guarantor",
      taskTitle: "2-Guarantor KYC & Bank Statement Check",
      assignedOfficer: "Priya Sundaram",
      priority: "Normal",
      status: "Pending",
      remarks: "Guarantor 1 (Brother) KYC verified. Guarantor 2 bank statement awaited.",
      dueDate: "17 Aug 2026",
    },
    {
      id: "vtask-5",
      appNo: "LA-9489",
      loanId: "loan-5",
      customerName: "Sunita Choudhury",
      loanProduct: "Personal Loan",
      employmentType: "self_employed",
      amount: 500000,
      category: "Document",
      taskTitle: "ITR V & 26AS Cross-Validation with Income Tax Portal",
      assignedOfficer: "Debashis Banerjee",
      priority: "Normal",
      status: "Pending",
      remarks: "AY 2025-26 ITR filed on time. Awaiting PAN-Aadhaar linking confirmation.",
      dueDate: "18 Aug 2026",
    },
  ];

  public disbursements: MockDisbursementRecord[] = [
    {
      id: "disb-1",
      appNo: "LA-9485",
      loanId: "loan-1",
      customerName: "Rahul Kapoor",
      customerPhone: "+91 99887 76655",
      loanProduct: "Home Loan",
      sanctionedAmount: 4500000,
      processingFee: 45000,
      insuranceFee: 12500,
      netDisbursal: 4442500,
      bankName: "HDFC Bank Ltd.",
      accountNumber: "50100084920194",
      ifsc: "HDFC0000060",
      accountHolder: "Rahul Kapoor",
      txnId: "RTGS-994820101",
      paymentMode: "RTGS",
      status: "Success",
      disbursedDate: "16 Aug 2026, 11:30 AM",
    },
    {
      id: "disb-2",
      appNo: "LA-9487",
      loanId: "loan-3",
      customerName: "Rajeshwar Patel",
      customerPhone: "+91 98250 11223",
      loanProduct: "Business Loan",
      sanctionedAmount: 3500000,
      processingFee: 52500,
      insuranceFee: 15000,
      netDisbursal: 3432500,
      bankName: "ICICI Bank Ltd.",
      accountNumber: "00040501839201",
      ifsc: "ICIC0000004",
      accountHolder: "Patel Precision Engineering",
      txnId: "",
      paymentMode: "RTGS",
      status: "Pending",
      disbursedDate: "Pending Authorization",
    },
    {
      id: "disb-3",
      appNo: "LA-9488",
      loanId: "loan-4",
      customerName: "Arun Nair",
      customerPhone: "+91 98490 66778",
      loanProduct: "Car Loan",
      sanctionedAmount: 1200000,
      processingFee: 12000,
      insuranceFee: 24000,
      netDisbursal: 1164000,
      bankName: "State Bank of India",
      accountNumber: "11223344556677",
      ifsc: "SBIN0000691",
      accountHolder: "Arun Nair",
      txnId: "NEFT-773920188",
      paymentMode: "NEFT",
      status: "Initiated",
      disbursedDate: "16 Aug 2026, 12:00 PM",
    },
  ];

  public dsas: MockDSA[] = [
    {
      id: "dsa-1",
      code: "DSA-1042",
      agencyName: "Apex Financial Solutions",
      contactPerson: "Vikas Sharma",
      email: "vikas@apexloans.in",
      phone: "+91 98455 67890",
      city: "Kolkata",
      branchName: "Kolkata Central",
      activeConnectors: 14,
      totalDisbursed: 48500000,
      commissionEarned: 727500,
      status: "active",
    },
    {
      id: "dsa-2",
      code: "DSA-2089",
      agencyName: "Finbridge Capital Advisors",
      contactPerson: "Alok Sengupta",
      email: "alok@finbridge.com",
      phone: "+91 98310 99881",
      city: "Salt Lake",
      branchName: "Salt Lake Sector V",
      activeConnectors: 8,
      totalDisbursed: 24000000,
      commissionEarned: 360000,
      status: "active",
    },
  ];

  public connectors: MockConnector[] = [
    {
      id: "con-1",
      code: "CON-312",
      name: "Sunil Sen",
      dsaName: "Apex Financial Solutions",
      phone: "+91 98316 78901",
      email: "sunil.sen@connect.in",
      leadsReferred: 38,
      convertedLoans: 19,
      commissionPaid: 142500,
      status: "active",
    },
    {
      id: "con-2",
      code: "CON-415",
      name: "Ramesh Ghosh",
      dsaName: "Apex Financial Solutions",
      phone: "+91 98305 44332",
      email: "ramesh.g@taxconsult.com",
      leadsReferred: 22,
      convertedLoans: 11,
      commissionPaid: 82500,
      status: "active",
    },
  ];

  public leads: MockLead[] = [
    {
      id: "lead-1",
      leadNo: "LD-8901",
      name: "Prakash Verma",
      phone: "+91 98310 11224",
      email: "prakash.v@vermatraders.com",
      city: "Kolkata",
      loanType: LoanType.BUSINESS,
      expectedAmount: 2000000,
      source: "website",
      status: "qualified",
      assignedTo: "Vikas Sharma (DSA)",
      createdAt: "2026-08-15T10:00:00.000Z",
    },
    {
      id: "lead-2",
      leadNo: "LD-8902",
      name: "Ananya Mukherjee",
      phone: "+91 98301 55667",
      email: "ananya.m@gmail.com",
      city: "Salt Lake",
      loanType: LoanType.HOME,
      expectedAmount: 5000000,
      source: "connector",
      sourceName: "Sunil Sen (CON-312)",
      status: "in_progress",
      assignedTo: "Debashis Banerjee",
      createdAt: "2026-08-15T14:30:00.000Z",
    },
  ];

  public commissions: Commission[] = [
    {
      id: "comm-1",
      loanId: "loan-1",
      agentId: "dsa-1",
      agentType: "dsa",
      commissionPercentage: 1.5,
      payoutAmount: 67500,
      status: "approved",
      disbursedAt: "2026-08-16T12:00:00.000Z",
      createdAt: "2026-08-16T10:00:00.000Z",
      updatedAt: "2026-08-16T12:00:00.000Z",
    },
    {
      id: "comm-2",
      loanId: "loan-3",
      agentId: "con-1",
      agentType: "connector",
      commissionPercentage: 0.5,
      payoutAmount: 17500,
      status: "pending",
      createdAt: "2026-08-16T11:00:00.000Z",
      updatedAt: "2026-08-16T11:00:00.000Z",
    },
  ];

  public branches: MockBranch[] = [
    {
      id: "br-kol-01",
      branchCode: "BR-KOL-01",
      branchName: "Kolkata Central Main Branch",
      areaName: "West Bengal East",
      managerName: "Subhashis Roy",
      underwritingHeadName: "Dr. Anirban Mukherjee",
      activeDSAs: 18,
      monthlyDisbursed: 42000000,
      phone: "+91 33 2289 0001",
      status: "active",
    },
    {
      id: "br-kol-02",
      branchCode: "BR-KOL-02",
      branchName: "Salt Lake Sector V Branch",
      areaName: "West Bengal East",
      managerName: "Rituparna Ghosh",
      underwritingHeadName: "Sanjay Maitra",
      activeDSAs: 12,
      monthlyDisbursed: 28000000,
      phone: "+91 33 2357 0002",
      status: "active",
    },
  ];

  public areas: MockArea[] = [
    {
      id: "area-1",
      areaCode: "AR-WB-EAST",
      areaName: "West Bengal East",
      state: "West Bengal",
      areaManagerName: "Subir Chatterjee",
      totalBranches: 8,
      totalDisbursalYTD: 340000000,
    },
  ];

  public auditLogs: MockAuditLog[] = [
    {
      id: "log-1",
      timestamp: "16 Aug 2026, 11:30 AM",
      userName: "Amitabh Sen (Disbursement Officer)",
      userRole: Role.DISBURSEMENT_OFFICER,
      action: "DISBURSEMENT_AUTHORIZED",
      entity: "LoanApplication",
      entityId: "LA-9485",
      ipAddress: "192.168.1.104",
      status: "success",
    },
    {
      id: "log-2",
      timestamp: "16 Aug 2026, 10:15 AM",
      userName: "Dr. Anirban Mukherjee (Branch Head)",
      userRole: Role.BRANCH_UNDERWRITING_HEAD,
      action: "SANCTION_LETTER_ISSUED",
      entity: "LoanApplication",
      entityId: "LA-9485",
      ipAddress: "192.168.1.102",
      status: "success",
    },
    {
      id: "log-3",
      timestamp: "15 Aug 2026, 04:45 PM",
      userName: "Priya Sundaram (Verification Officer)",
      userRole: Role.VERIFICATION_OFFICER,
      action: "PROPERTY_LEGAL_VERIFIED",
      entity: "VerificationTask",
      entityId: "vtask-1",
      ipAddress: "192.168.1.110",
      status: "success",
    },
  ];
}

export const mockDatabase = new MockDatabase();
