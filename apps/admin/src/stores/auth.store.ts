import { create } from "zustand";
import { Role, User } from "@nbfc/shared-types";

export interface MockUserProfile extends User {
  roleLabel: string;
  scopeContext: string;
  avatarText: string;
  phone: string;
  assignedArea?: string;
  assignedBranch?: string;
  agencyName?: string;
}

export const MOCK_USERS: Record<Role, MockUserProfile> = {
  [Role.SUPER_ADMIN]: {
    id: "user-super-admin",
    name: "Allie Grater",
    email: "allie.admin@nbfc.com",
    role: Role.SUPER_ADMIN,
    roleLabel: "Super Admin",
    scopeContext: "Nationwide HQ (All Areas & Branches)",
    avatarText: "AG",
    phone: "+91 98300 00001",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.COMPANY_ADMIN]: {
    id: "user-company-admin",
    name: "Rajesh Khurana",
    email: "rajesh.k@arohonloans.com",
    role: Role.COMPANY_ADMIN,
    roleLabel: "Company Admin",
    scopeContext: "Arohon Financial Services Corporate HQ",
    avatarText: "RK",
    phone: "+91 98300 00002",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.AREA_MANAGER]: {
    id: "user-area-mgr",
    name: "Subir Chatterjee",
    email: "subir.c@nbfc.com",
    role: Role.AREA_MANAGER,
    roleLabel: "Area Manager",
    scopeContext: "West Bengal East Region (8 Branches)",
    avatarText: "SC",
    phone: "+91 98301 11223",
    assignedArea: "West Bengal East",
    createdAt: "2024-03-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.BRANCH_MANAGER]: {
    id: "user-branch-mgr",
    name: "Subhashis Roy",
    email: "subhashis.roy@nbfc.com",
    role: Role.BRANCH_MANAGER,
    roleLabel: "Branch Manager",
    scopeContext: "Kolkata Central Branch (BR-KOL-01)",
    avatarText: "SR",
    phone: "+91 98302 34567",
    assignedArea: "West Bengal East",
    assignedBranch: "Kolkata Central",
    createdAt: "2024-04-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.DSA]: {
    id: "user-dsa-apex",
    name: "Vikas Sharma",
    email: "vikas@apexloans.in",
    role: Role.DSA,
    roleLabel: "DSA Partner",
    scopeContext: "Apex Financial Solutions (DSA-1042)",
    avatarText: "VS",
    phone: "+91 98455 67890",
    agencyName: "Apex Financial Solutions",
    assignedBranch: "Kolkata Central",
    createdAt: "2024-05-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.CONNECTOR]: {
    id: "user-connector-sunil",
    name: "Sunil Sen",
    email: "sunil.sen@connect.in",
    role: Role.CONNECTOR,
    roleLabel: "Lead Connector",
    scopeContext: "Tax Consultant & Referral Partner (CON-312)",
    avatarText: "SS",
    phone: "+91 98316 78901",
    assignedBranch: "Kolkata Central",
    createdAt: "2024-06-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.STAFF]: {
    id: "user-staff-priya",
    name: "Priya Sundaram",
    email: "priya.sundaram@nbfc.com",
    role: Role.STAFF,
    roleLabel: "Senior Credit & Verification Officer",
    scopeContext: "Underwriting & KYC Verification Queue",
    avatarText: "PS",
    phone: "+91 98203 45678",
    assignedBranch: "Kolkata Central",
    createdAt: "2024-07-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
  [Role.CUSTOMER]: {
    id: "user-customer",
    name: "Rahul Kapoor",
    email: "rahul.k@gmail.com",
    role: Role.CUSTOMER,
    roleLabel: "Retail Borrower",
    scopeContext: "Personal & Home Loan Customer",
    avatarText: "RK",
    phone: "+91 98111 22334",
    createdAt: "2024-08-01T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
};

const STORAGE_KEY = "nbfc_admin_active_role";

function getInitialRole(): Role {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Role;
    if (saved && Object.values(Role).includes(saved)) {
      return saved;
    }
  } catch (e) {
    // Ignore localStorage errors
  }
  return Role.SUPER_ADMIN;
}

interface AuthState {
  user: MockUserProfile | null;
  token: string | null;
  refreshToken: string | null;
  role: Role | null;
  setAuth: (user: any, token: string, refreshToken: string) => void;
  setToken: (token: string) => void;
  switchRole: (role: Role) => void;
  loginAs: (role: Role) => void;
  logout: () => void;
}

const initialRole = getInitialRole();

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USERS[initialRole],
  token: "mock-nbfc-jwt-token-" + initialRole,
  refreshToken: "mock-nbfc-refresh-token",
  role: initialRole,

  setAuth: (user, token, refreshToken) =>
    set({ user, token, refreshToken, role: user.role }),

  setToken: (token) => set({ token }),

  switchRole: (newRole: Role) => {
    try {
      localStorage.setItem(STORAGE_KEY, newRole);
    } catch (e) {}
    const profile = MOCK_USERS[newRole] || MOCK_USERS[Role.SUPER_ADMIN];
    set({
      user: profile,
      token: "mock-nbfc-jwt-token-" + newRole,
      role: newRole,
    });
  },

  loginAs: (newRole: Role) => {
    try {
      localStorage.setItem(STORAGE_KEY, newRole);
    } catch (e) {}
    const profile = MOCK_USERS[newRole] || MOCK_USERS[Role.SUPER_ADMIN];
    set({
      user: profile,
      token: "mock-nbfc-jwt-token-" + newRole,
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
