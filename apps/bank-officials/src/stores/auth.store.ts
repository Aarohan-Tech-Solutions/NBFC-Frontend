import { create } from "zustand";
import { Role, User } from "@nbfc/shared-types";

export interface BankOfficialUserProfile extends User {
  roleLabel: string;
  scopeContext: string;
  avatarText: string;
  phone: string;
  assignedBranch: string;
  sanctionLimit: number;
}

export const MOCK_OFFICIALS: Record<
  Role.SENIOR_CREDIT_OFFICER | Role.VERIFICATION_OFFICER | Role.DISBURSEMENT_OFFICER | Role.BRANCH_UNDERWRITING_HEAD,
  BankOfficialUserProfile
> = {
  [Role.SENIOR_CREDIT_OFFICER]: {
    id: "user-credit-banerjee",
    name: "Debashis Banerjee",
    email: "debashis.credit@nbfc.com",
    role: Role.SENIOR_CREDIT_OFFICER,
    roleLabel: "Senior Credit & Underwriting Officer",
    scopeContext: "Credit Risk & Appraisal Queue (Kolkata Central)",
    avatarText: "DB",
    phone: "+91 98301 22334",
    assignedBranch: "Kolkata Central Main Branch",
    sanctionLimit: 2500000,
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.VERIFICATION_OFFICER]: {
    id: "user-verif-sundaram",
    name: "Priya Sundaram",
    email: "priya.sundaram@nbfc.com",
    role: Role.VERIFICATION_OFFICER,
    roleLabel: "Verification & Field Inspection Officer",
    scopeContext: "Field Inspections, KYC & Collateral Valuation",
    avatarText: "PS",
    phone: "+91 98203 45678",
    assignedBranch: "Kolkata Central Main Branch",
    sanctionLimit: 0,
    createdAt: "2024-03-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.DISBURSEMENT_OFFICER]: {
    id: "user-disb-sen",
    name: "Amitabh Sen",
    email: "amitabh.disb@nbfc.com",
    role: Role.DISBURSEMENT_OFFICER,
    roleLabel: "Disbursement & Operations Manager",
    scopeContext: "Escrow Banking & Fund Release Desk",
    avatarText: "AS",
    phone: "+91 98302 99887",
    assignedBranch: "Kolkata Central Main Branch",
    sanctionLimit: 10000000,
    createdAt: "2024-04-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.BRANCH_UNDERWRITING_HEAD]: {
    id: "user-head-mukherjee",
    name: "Dr. Anirban Mukherjee",
    email: "anirban.head@nbfc.com",
    role: Role.BRANCH_UNDERWRITING_HEAD,
    roleLabel: "Branch Underwriting Head & Credit Authority",
    scopeContext: "Sanction Delegation & Risk Governance (BR-KOL-01)",
    avatarText: "AM",
    phone: "+91 98300 77665",
    assignedBranch: "Kolkata Central Main Branch",
    sanctionLimit: 5000000,
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
};

const STORAGE_KEY = "nbfc_official_active_role";

function getInitialRole(): Role.SENIOR_CREDIT_OFFICER | Role.VERIFICATION_OFFICER | Role.DISBURSEMENT_OFFICER | Role.BRANCH_UNDERWRITING_HEAD {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as any;
    if (saved && Object.keys(MOCK_OFFICIALS).includes(saved)) {
      return saved;
    }
  } catch (e) {}
  return Role.BRANCH_UNDERWRITING_HEAD;
}

interface OfficialAuthState {
  user: BankOfficialUserProfile | null;
  token: string | null;
  refreshToken: string | null;
  role: Role | null;
  setAuth: (user: BankOfficialUserProfile, token: string, refreshToken: string) => void;
  setToken: (token: string) => void;
  switchRole: (newRole: Role.SENIOR_CREDIT_OFFICER | Role.VERIFICATION_OFFICER | Role.DISBURSEMENT_OFFICER | Role.BRANCH_UNDERWRITING_HEAD) => void;
  logout: () => void;
}

const initialRole = getInitialRole();

export const useOfficialAuthStore = create<OfficialAuthState>((set) => ({
  user: MOCK_OFFICIALS[initialRole],
  token: `mock-official-jwt-${initialRole}`,
  refreshToken: "mock-official-refresh-token",
  role: initialRole,

  setAuth: (user, token, refreshToken) =>
    set({ user, token, refreshToken, role: user.role as any }),

  setToken: (token) => set({ token }),

  switchRole: (newRole) => {
    try {
      localStorage.setItem(STORAGE_KEY, newRole);
    } catch (e) {}
    const profile = MOCK_OFFICIALS[newRole];
    set({
      user: profile,
      token: `mock-official-jwt-${newRole}`,
      role: newRole,
    });
  },

  logout: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    set({ user: null, token: null, refreshToken: null, role: null });
  },
}));
