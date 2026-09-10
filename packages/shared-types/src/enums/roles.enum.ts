export enum Role {
  SUPER_ADMIN = "super_admin",
  COMPANY_ADMIN = "company_admin",
  AREA_MANAGER = "area_manager",

  /**
   * BRANCH MANAGER: Responsible for branch commercial operations, sales targets,
   * P&L, onboarding & managing DSA / Connector networks, lead distribution,
   * and regional customer escalations.
   * NOTE: Does NOT hold unilateral credit sanctioning authority per RBI risk-partitioning guidelines.
   */
  BRANCH_MANAGER = "branch_manager",

  DSA = "dsa",
  CONNECTOR = "connector",
  STAFF = "staff",
  CUSTOMER = "customer",

  /**
   * BANK & NBFC OFFICIAL ROLES (Dedicated Credit & Underwriting Division)
   */

  /**
   * SENIOR CREDIT OFFICER: Evaluates applicant creditworthiness, CIBIL/bureau records,
   * income eligibility, FOIR/DTI, and prepares loan appraisal notes.
   */
  SENIOR_CREDIT_OFFICER = "senior_credit_officer",

  /**
   * VERIFICATION OFFICER: Conducts on-ground field inspections, KYC checks,
   * legal title search & property valuation validation, and guarantor vetting.
   */
  VERIFICATION_OFFICER = "verification_officer",

  /**
   * DISBURSEMENT OFFICER: Manages escrow banking transfers, validates processing fee &
   * insurance deductions, confirms beneficiary account, and records bank UTR/transaction IDs.
   */
  DISBURSEMENT_OFFICER = "disbursement_officer",

  /**
   * BRANCH UNDERWRITING HEAD: Holds formal branch-level credit delegation authority
   * (e.g. up to ₹50L sanction limit), reviews credit deviation requests,
   * and issues final loan sanction letters or formal adverse action rejection notices.
   * NOTE: Distinct from Branch Manager; focuses exclusively on asset quality, risk gatekeeping,
   * and underwriting compliance without sales volume targets.
   */
  BRANCH_UNDERWRITING_HEAD = "branch_underwriting_head",
}

