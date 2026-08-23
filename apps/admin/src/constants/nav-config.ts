import { Role } from "@nbfc/shared-types";

export interface NavItem {
  id: string;
  label: string;
  path: string;
  iconName: string;
  roles: Role[];
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    iconName: "LayoutDashboard",
    roles: [
      Role.SUPER_ADMIN,
      Role.COMPANY_ADMIN,
      Role.AREA_MANAGER,
      Role.BRANCH_MANAGER,
      Role.DSA,
      Role.CONNECTOR,
      Role.STAFF,
    ],
  },
  {
    id: "users",
    label: "Users Management",
    path: "/users",
    iconName: "Users",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN],
  },
  {
    id: "roles-permissions",
    label: "Roles & Permissions",
    path: "/roles-permissions",
    iconName: "ShieldCheck",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN],
  },
  {
    id: "company",
    label: "Company Settings",
    path: "/company",
    iconName: "Building2",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN],
  },
  {
    id: "areas",
    label: "Areas",
    path: "/areas",
    iconName: "MapPin",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.AREA_MANAGER],
  },
  {
    id: "branches",
    label: "Branches",
    path: "/branches",
    iconName: "GitBranch",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.AREA_MANAGER, Role.BRANCH_MANAGER],
  },
  {
    id: "dsa",
    label: "DSA Partners",
    path: "/dsa",
    iconName: "UserCheck",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.AREA_MANAGER, Role.BRANCH_MANAGER],
  },
  {
    id: "connectors",
    label: "Connectors",
    path: "/connectors",
    iconName: "Network",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.AREA_MANAGER, Role.BRANCH_MANAGER],
  },
  {
    id: "customers",
    label: "Customers",
    path: "/customers",
    iconName: "UserGroup",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.AREA_MANAGER, Role.BRANCH_MANAGER, Role.STAFF],
  },
  {
    id: "loans",
    label: "Loan Applications",
    path: "/loans",
    iconName: "FileText",
    roles: [
      Role.SUPER_ADMIN,
      Role.COMPANY_ADMIN,
      Role.AREA_MANAGER,
      Role.BRANCH_MANAGER,
      Role.DSA,
      Role.CONNECTOR,
      Role.STAFF,
    ],
  },
  {
    id: "documents",
    label: "Documents Vault",
    path: "/documents",
    iconName: "FolderKanban",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.BRANCH_MANAGER, Role.STAFF],
  },
  {
    id: "verification",
    label: "Verification Queue",
    path: "/verification",
    iconName: "CheckSquare",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.BRANCH_MANAGER, Role.STAFF],
  },
  {
    id: "leads",
    label: "Leads Management",
    path: "/leads",
    iconName: "Target",
    roles: [
      Role.SUPER_ADMIN,
      Role.COMPANY_ADMIN,
      Role.AREA_MANAGER,
      Role.BRANCH_MANAGER,
      Role.DSA,
      Role.CONNECTOR,
      Role.STAFF,
    ],
  },
  {
    id: "crm",
    label: "CRM Activities",
    path: "/crm",
    iconName: "PhoneCall",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.BRANCH_MANAGER, Role.STAFF],
  },
  {
    id: "commissions",
    label: "Commissions",
    path: "/commissions",
    iconName: "Banknote",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.AREA_MANAGER, Role.DSA, Role.CONNECTOR],
  },
  {
    id: "disbursement",
    label: "Disbursements",
    path: "/disbursement",
    iconName: "CreditCard",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.BRANCH_MANAGER],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    path: "/reports",
    iconName: "BarChart3",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.AREA_MANAGER, Role.BRANCH_MANAGER],
  },
  {
    id: "cms",
    label: "CMS & Portal Content",
    path: "/cms",
    iconName: "Globe",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN],
  },
  {
    id: "settings",
    label: "System Settings",
    path: "/settings",
    iconName: "Sliders",
    roles: [Role.SUPER_ADMIN, Role.COMPANY_ADMIN],
  },
  {
    id: "security",
    label: "Security & Audit",
    path: "/security",
    iconName: "Lock",
    roles: [Role.SUPER_ADMIN],
  },
];

export function getNavItemsForRole(role: Role | null): NavItem[] {
  if (!role) return [];
  return ADMIN_NAV_ITEMS.filter((item) => item.roles.includes(role));
}
