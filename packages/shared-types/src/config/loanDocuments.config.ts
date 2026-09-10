import { LoanType } from "../enums/loans.enum";

export type EmploymentType = "salaried" | "self_employed" | "business_owner" | "all";

export interface DocumentRuleContext {
  employmentType?: EmploymentType;
  loanAmount?: number;
  hasCoApplicant?: boolean;
  hasGuarantor?: boolean;
  [key: string]: any;
}

export interface LoanDocumentRequirement {
  id: string;
  title: string;
  category: "KYC" | "Financial" | "Property" | "Vehicle" | "Guarantor" | "Legal" | "Reference";
  description: string;
  required: boolean | ((context?: DocumentRuleContext) => boolean);
  conditionalNote?: string;
  appliesTo?: EmploymentType[];
  acceptableFormats?: string[];
}

export const LOAN_DOCUMENT_CONFIGS: Record<LoanType, LoanDocumentRequirement[]> = {
  [LoanType.PERSONAL]: [
    {
      id: "p_email_phone",
      title: "Verified Mail ID & Phone Number",
      category: "KYC",
      description: "Primary applicant email ID and mobile number OTP verification records.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["Digital OTP Verification"],
    },
    {
      id: "p_aadhaar",
      title: "Aadhaar Card (Front & Back)",
      category: "KYC",
      description: "Government issued Aadhaar with address and UIDAI XML / OTP match.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG", "PNG"],
    },
    {
      id: "p_pan",
      title: "PAN Card",
      category: "KYC",
      description: "Individual Permanent Account Number card verified on NSDL/ITD.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG", "PNG"],
    },
    {
      id: "p_photo",
      title: "Applicant Photograph / Live Selfie",
      category: "KYC",
      description: "Recent color passport photograph or geo-tagged live selfie.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["JPG", "PNG"],
    },
    {
      id: "p_bank_statement",
      title: "1-Year Bank Account Statement",
      category: "Financial",
      description: "Latest 12 months consecutive bank statements with salary/income credits.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF (e-Statement)", "Scanned PDF"],
    },
    {
      id: "p_pay_slips",
      title: "Pay Slips (Last 3 Months)",
      category: "Financial",
      description: "Consecutive salary slips from employer displaying deductions & allowances.",
      required: (ctx) => ctx?.employmentType === "salaried" || !ctx?.employmentType,
      conditionalNote: "Mandatory for Salaried applicants",
      appliesTo: ["salaried"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "p_itr",
      title: "ITR Acknowledgement & Form 16 (Last 2 Years)",
      category: "Financial",
      description: "Income tax return filings with computation of income or Form 16.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "p_trade_licence",
      title: "Trade Licence / Shop Establishment Certificate",
      category: "Legal",
      description: "Municipal or local panchayat trade licence in applicant's name.",
      required: (ctx) => ctx?.employmentType === "self_employed" || ctx?.employmentType === "business_owner",
      conditionalNote: "Required for Self-Employed & Business Applicants",
      appliesTo: ["self_employed", "business_owner"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "p_msme_gst",
      title: "MSME Udyam Certificate / GST Registration",
      category: "Legal",
      description: "GSTIN registration certificate and MSME Udyam registration.",
      required: (ctx) => ctx?.employmentType === "self_employed" || ctx?.employmentType === "business_owner",
      conditionalNote: "Required if turnover > ₹20L or registered as MSME entity",
      appliesTo: ["self_employed", "business_owner"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "p_references",
      title: "2 Personal References (Name & Phone)",
      category: "Reference",
      description: "Names, relation, and contact numbers of two non-family/colleague references.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["Contact Form Submission"],
    },
  ],

  [LoanType.MORTGAGE]: [
    {
      id: "m_property_deed",
      title: "Property Title Deed / Sale Deed / Record of Rights",
      category: "Property",
      description: "Chain of title deeds for the last 30 years and registered sale deed.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["Certified PDF Scan"],
    },
    {
      id: "m_conversion_cert",
      title: "Conversion Certificate / Land Mutation & Parcha",
      category: "Property",
      description: "Land revenue department mutation certificate and non-agricultural conversion.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF Scan"],
    },
    {
      id: "m_property_estimate",
      title: "Property Estimate & Technical Valuation Report",
      category: "Property",
      description: "Valuation report from bank empanelled civil engineer/valuer.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "m_tax_receipts",
      title: "Municipal Property Tax Paid Receipts & Approved Plan",
      category: "Property",
      description: "Up-to-date property tax receipts and municipality sanctioned building plan.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "m_gst_msme",
      title: "GST & MSME Udyam Registration",
      category: "Legal",
      description: "Entity registration proof for enterprise or self-employed mortgage files.",
      required: (ctx) => ctx?.employmentType !== "salaried",
      conditionalNote: "Mandatory for Self-Employed / Business entities",
      appliesTo: ["self_employed", "business_owner"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "m_trade_licence",
      title: "Trade Licence Certificate",
      category: "Legal",
      description: "Valid municipal trade licence for operating commercial premises.",
      required: (ctx) => ctx?.employmentType !== "salaried",
      conditionalNote: "Required for Commercial Mortgages & Business Units",
      appliesTo: ["self_employed", "business_owner"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "m_electric_bill",
      title: "Electricity Utility Bill (Property Address)",
      category: "Property",
      description: "Latest 2 months power utility bill in owner/property name.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "m_kyc",
      title: "Primary Applicant KYC (PAN, Aadhaar, Mail ID & Phone)",
      category: "KYC",
      description: "Complete identity and residential address documentation.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "m_coapplicant",
      title: "Co-Applicant / Guardian KYC & Relationship Proof (Applicant C/O Applicant)",
      category: "KYC",
      description: "Joint owner / Guardian / Spouse KYC & registered co-ownership title.",
      required: (ctx) => ctx?.hasCoApplicant ?? true,
      conditionalNote: "Mandatory for joint property owners & co-borrowers",
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "m_bank_statement",
      title: "1-Year Bank Statement (Applicant & Co-Applicant)",
      category: "Financial",
      description: "12 months continuous banking statements for all income-contributing parties.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "m_photos",
      title: "Property & Business Photographs (Geo-Tagged)",
      category: "Property",
      description: "Front elevation, interior, approach road, and residential/business photos.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["JPG", "PNG"],
    },
    {
      id: "m_references",
      title: "2 Neighbour / Commercial References (Name & Phone)",
      category: "Reference",
      description: "Local references with property familiarity.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["Form Entry"],
    },
  ],

  [LoanType.CAR]: [
    {
      id: "c_applicant_kyc",
      title: "Primary Applicant KYC (PAN, Aadhaar, Phone, Address)",
      category: "KYC",
      description: "Complete biometric and identity verification of the vehicle borrower.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "c_guarantor1_kyc",
      title: "Guarantor #1 KYC Documents (PAN & Aadhaar)",
      category: "Guarantor",
      description: "First financial guarantor's identity and residential address proof.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "c_guarantor2_kyc",
      title: "Guarantor #2 KYC Documents (PAN & Aadhaar)",
      category: "Guarantor",
      description: "Second guarantor's identity and address verification.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "c_bank_statements",
      title: "1-Year Bank Statement (Applicant + 2 Guarantors)",
      category: "Financial",
      description: "Bank statements showing healthy cash flows for applicant and guarantors.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "c_rc_book",
      title: "Vehicle Registration Certificate (RC Book / Proforma)",
      category: "Vehicle",
      description: "For used cars: Smart RC book copy; For new cars: Dealer Proforma Invoice.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "c_tax_token",
      title: "Road Tax Token & Fitness Certificate",
      category: "Vehicle",
      description: "Valid commercial or private road tax payment token certificate.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "c_insurance",
      title: "Comprehensive Vehicle Insurance Policy",
      category: "Vehicle",
      description: "Active motor insurance policy with NBFC hypothecation endorsement.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "c_driving_licence",
      title: "Driving Licence (Borrower or Commercial Driver)",
      category: "Vehicle",
      description: "Valid driving licence of borrower or designated vehicle operator.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "c_references",
      title: "2 Family / Commercial References (Name & Phone)",
      category: "Reference",
      description: "Contact details for loan verification and vehicle repo checks.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["Form Entry"],
    },
  ],

  [LoanType.HOME]: [
    {
      id: "h_applicant_kyc",
      title: "Applicant & Co-Applicant KYC (PAN & Aadhaar)",
      category: "KYC",
      description: "Identity and address records for all joint home loan applicants.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "h_property_allotment",
      title: "Builder Allotment Letter / Agreement for Sale",
      category: "Property",
      description: "Registered builder buyer agreement, payment receipts, and NOC.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "h_bank_statement",
      title: "1-Year Salary / Business Bank Statement",
      category: "Financial",
      description: "12 months bank statement reflecting steady income and EMI capacity.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "h_income_proof",
      title: "Form 16 / ITR Returns (Last 2 Years)",
      category: "Financial",
      description: "Income computation and tax returns filed with income tax dept.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
  ],

  [LoanType.BUSINESS]: [
    {
      id: "b_entity_kyc",
      title: "Business Entity KYC & Udyam Certificate",
      category: "Legal",
      description: "MSME Udyam, Partnership Deed / Certificate of Incorporation.",
      required: true,
      appliesTo: ["business_owner", "self_employed"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "b_gst_returns",
      title: "GST Returns (GSTR-3B & GSTR-1 for Last 12 Months)",
      category: "Financial",
      description: "Monthly GST filings matching sales turnover.",
      required: true,
      appliesTo: ["business_owner", "self_employed"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "b_audited_financials",
      title: "CA Audited Balance Sheet & Profit/Loss (2 Years)",
      category: "Financial",
      description: "Audited financial statements with schedules and tax audit report.",
      required: true,
      appliesTo: ["business_owner", "self_employed"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "b_current_account",
      title: "1-Year Current Account Bank Statement",
      category: "Financial",
      description: "Primary operational banking statements showing business turnover.",
      required: true,
      appliesTo: ["business_owner", "self_employed"],
      acceptableFormats: ["PDF"],
    },
  ],

  [LoanType.EDUCATION]: [
    {
      id: "e_admission_letter",
      title: "Admission Letter & Fee Schedule from University",
      category: "Legal",
      description: "Unconditional offer letter from recognized university or institute.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "e_student_kyc",
      title: "Student KYC & Academic Transcripts",
      category: "KYC",
      description: "Student PAN, Aadhaar, 10th, 12th, and Degree graduation marks sheets.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
    {
      id: "e_parent_kyc",
      title: "Parent / Co-Borrower KYC & Income Proof (ITR & Salary)",
      category: "Guarantor",
      description: "Financial guarantor or parent KYC and 2 years ITR / Form 16.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF"],
    },
  ],

  [LoanType.GOLD]: [
    {
      id: "g_applicant_kyc",
      title: "Borrower PAN & Aadhaar Card",
      category: "KYC",
      description: "Primary identity and address documentation.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["PDF", "JPG"],
    },
    {
      id: "g_jewellery_appraisal",
      title: "Gold Ornaments Weight & Purity Appraisal Certificate",
      category: "Property",
      description: "Appraiser certificate for karat purity (18K-24K) and net gold weight.",
      required: true,
      appliesTo: ["all"],
      acceptableFormats: ["Appraiser Slip"],
    },
  ],
};

/**
 * Returns required document list dynamically filtered by loan type and applicant context
 */
export function getRequiredDocuments(
  loanType: LoanType | string,
  context?: DocumentRuleContext
): Array<LoanDocumentRequirement & { isMandatory: boolean }> {
  const normType = (loanType as string).toLowerCase().replace(/[-\s]/g, "") as LoanType;
  
  let matchedType: LoanType = LoanType.PERSONAL;
  if (normType.includes("mortgage") || normType.includes("lap")) matchedType = LoanType.MORTGAGE;
  else if (normType.includes("car") || normType.includes("auto") || normType.includes("vehicle")) matchedType = LoanType.CAR;
  else if (normType.includes("home")) matchedType = LoanType.HOME;
  else if (normType.includes("business") || normType.includes("msme")) matchedType = LoanType.BUSINESS;
  else if (normType.includes("education")) matchedType = LoanType.EDUCATION;
  else if (normType.includes("gold")) matchedType = LoanType.GOLD;
  
  const configs = LOAN_DOCUMENT_CONFIGS[matchedType] || LOAN_DOCUMENT_CONFIGS[LoanType.PERSONAL];

  return configs.map((doc) => {
    const isMandatory =
      typeof doc.required === "function"
        ? doc.required(context)
        : Boolean(doc.required);

    return {
      ...doc,
      isMandatory,
    };
  });
}
