import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  MapPin,
  GitBranch,
  Users,
  UserCheck,
  Target,
  Wallet,
  DollarSign,
  BarChart3,
  Building,
  ShieldAlert,
  BookOpen,
  X,
  Sparkles,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useAuthStore } from "../../stores/auth.store";
import { Role } from "@nbfc/shared-types";

interface LunoSidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  hasChevron?: boolean;
  badge?: string;
}

export const LunoSidebar: React.FC<LunoSidebarProps> = ({
  isCollapsed = false,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { role, user } = useAuthStore();
  const currentRole = role || Role.SUPER_ADMIN;

  // Build role-tailored navigation items
  const getNavItems = (): { section: string; items: NavItem[] }[] => {
    switch (currentRole) {
      case Role.STAFF:
        return [
          {
            section: "VERIFICATION DESK",
            items: [
              { label: "My Tasks Dashboard", path: "/dashboard", icon: LayoutDashboard },
              { label: "Verification Queue", path: "/verification", icon: CheckCircle2, badge: "8 Due" },
              { label: "Files Underwriting", path: "/loans", icon: FileText },
              { label: "Document Vault", path: "/documents", icon: BookOpen },
            ],
          },
        ];

      case Role.CONNECTOR:
        return [
          {
            section: "CONNECTOR PORTAL",
            items: [
              { label: "Connector Dashboard", path: "/dashboard", icon: LayoutDashboard },
              { label: "Referred Leads", path: "/leads", icon: Target },
              { label: "Converted Loans", path: "/loans", icon: FileText },
              { label: "Commission Payouts", path: "/commissions", icon: DollarSign },
              { label: "KYC & Documents", path: "/documents", icon: BookOpen },
            ],
          },
        ];

      case Role.DSA:
        return [
          {
            section: "DSA PARTNER PORTAL",
            items: [
              { label: "Partner Dashboard", path: "/dashboard", icon: LayoutDashboard },
              { label: "Loan Applications", path: "/loans", icon: FileText },
              { label: "Sourced Leads", path: "/leads", icon: Target },
              { label: "My Connectors", path: "/connectors", icon: UserCheck },
              { label: "Commission Statements", path: "/commissions", icon: DollarSign },
              { label: "Agency KYC & Vault", path: "/documents", icon: BookOpen },
            ],
          },
        ];

      case Role.BRANCH_MANAGER:
        return [
          {
            section: "BRANCH OPERATIONS",
            items: [
              { label: "Branch Dashboard", path: "/dashboard", icon: LayoutDashboard },
              { label: "Branch Applications", path: "/loans", icon: FileText },
              { label: "Verification Desk", path: "/verification", icon: CheckCircle2 },
              { label: "Branch DSA Partners", path: "/dsa", icon: Users },
              { label: "Branch Connectors", path: "/connectors", icon: UserCheck },
              { label: "Branch Leads", path: "/leads", icon: Target },
              { label: "Branch Customers", path: "/customers", icon: Users },
              { label: "Branch Disbursements", path: "/disbursement", icon: Wallet },
              { label: "Branch Reports", path: "/reports", icon: BarChart3 },
            ],
          },
        ];

      case Role.AREA_MANAGER:
        return [
          {
            section: "REGIONAL CLUSTER",
            items: [
              { label: "Area Dashboard", path: "/dashboard", icon: LayoutDashboard },
              { label: "Area Loan Pipeline", path: "/loans", icon: FileText },
              { label: "Area Verifications", path: "/verification", icon: CheckCircle2 },
              { label: "Regional Branches", path: "/branches", icon: GitBranch },
              { label: "Regional DSAs", path: "/dsa", icon: Users },
              { label: "Regional Connectors", path: "/connectors", icon: UserCheck },
              { label: "Regional Leads", path: "/leads", icon: Target },
              { label: "Area Performance", path: "/reports", icon: BarChart3 },
            ],
          },
        ];

      case Role.COMPANY_ADMIN:
        return [
          {
            section: "CORPORATE GOVERNANCE",
            items: [
              { label: "Executive Dashboard", path: "/dashboard", icon: LayoutDashboard },
              { label: "Loan Pipeline", path: "/loans", icon: FileText },
              { label: "Verification Queue", path: "/verification", icon: CheckCircle2 },
              { label: "Regional Areas", path: "/areas", icon: MapPin },
              { label: "Branch Network", path: "/branches", icon: GitBranch },
              { label: "DSA Partners", path: "/dsa", icon: Users },
              { label: "Connectors", path: "/connectors", icon: UserCheck },
              { label: "Disbursement Vault", path: "/disbursement", icon: Wallet },
              { label: "Commission Payouts", path: "/commissions", icon: DollarSign },
              { label: "Corporate Analytics", path: "/reports", icon: BarChart3 },
              { label: "Company Settings", path: "/company", icon: Building },
            ],
          },
        ];

      case Role.SUPER_ADMIN:
      default:
        return [
          {
            section: "LOAN ORIGINATION",
            items: [
              { label: "Command Dashboard", path: "/dashboard", icon: LayoutDashboard },
              { label: "Loan Applications", path: "/loans", icon: FileText },
              { label: "Verification Queue", path: "/verification", icon: CheckCircle2, badge: "Queue" },
              { label: "Leads Funnel", path: "/leads", icon: Target },
              { label: "Customer Base", path: "/customers", icon: Users },
            ],
          },
          {
            section: "NETWORK & ENTITIES",
            items: [
              { label: "Area Management", path: "/areas", icon: MapPin },
              { label: "Branch Offices", path: "/branches", icon: GitBranch },
              { label: "DSA Partners", path: "/dsa", icon: Users },
              { label: "Connector Network", path: "/connectors", icon: UserCheck },
              { label: "Disbursements", path: "/disbursement", icon: Wallet },
              { label: "Commissions", path: "/commissions", icon: DollarSign },
            ],
          },
          {
            section: "ADMINISTRATION",
            items: [
              { label: "Portfolio Reports", path: "/reports", icon: BarChart3 },
              { label: "Company & Policies", path: "/company", icon: Building },
              { label: "Users & Staff", path: "/users", icon: Users },
              { label: "Roles & Security", path: "/roles-permissions", icon: Shield },
            ],
          },
        ];
    }
  };

  const navSections = getNavItems();

  return (
    <aside
      className={`bg-white dark:bg-[#13151b] text-slate-800 dark:text-slate-200 border-r border-slate-200/80 dark:border-[#222530] flex flex-col h-screen fixed left-0 top-0 bottom-0 select-none overflow-hidden transition-[width,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] will-change-[width,transform] z-40 shadow-sm dark:shadow-none ${
        /* Mobile handling */
        isMobileOpen
          ? "translate-x-0 w-[280px] sm:w-[300px] shadow-2xl"
          : "-translate-x-full lg:translate-x-0"
      } ${
        /* Desktop collapsed vs expanded handling */
        isCollapsed ? "lg:w-[88px]" : "lg:w-[300px]"
      }`}
    >
      {/* Brand Header */}
      <div className="h-[76px] border-b border-slate-200 dark:border-[#222530] flex items-center px-4 justify-between transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] overflow-hidden shrink-0">
        <div className="flex items-center min-w-0">
          <div
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-[#00d2b4] shadow-lg shadow-blue-600/30 flex items-center justify-center text-white font-black text-lg ring-2 ring-blue-400/30 shrink-0 transform hover:scale-105 transition-transform"
            title="Arohon NBFC"
          >
            A
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              isCollapsed
                ? "max-w-0 opacity-0 -translate-x-4 pointer-events-none ml-0"
                : "max-w-[170px] opacity-100 translate-x-0 ml-3"
            }`}
          >
            <h1 className="text-base font-black text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
              Arohon NBFC
            </h1>
            <span className="text-[10px] text-teal-600 dark:text-[#00d2b4] font-bold block whitespace-nowrap">
              {user?.roleLabel || "Loan Portal"}
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1c1e27] hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-slate-200 dark:border-[#2b2e3c] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 lg:hidden transition-colors shrink-0"
          title="Close Navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scope / Assignment Indicator Badge */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shrink-0 ${
          isCollapsed
            ? "max-h-0 opacity-0 -translate-y-2 pointer-events-none py-0 px-4"
            : "max-h-24 opacity-100 translate-y-0 py-3 px-4"
        }`}
      >
        <div className="bg-slate-100/90 dark:bg-[#181a24] border border-slate-200/80 dark:border-[#262938] rounded-xl px-3 py-2 text-xs flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#00d2b4] animate-pulse shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase block tracking-wider">
              Assigned Scope
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200 block truncate text-[11px]">
              {user?.scopeContext || "Company-wide HQ"}
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-4 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]">
        {navSections.map((section, sIdx) => (
          <div
            key={sIdx}
            className="bg-slate-100/60 dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-2 space-y-1"
          >
            <div
              className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                isCollapsed
                  ? "max-h-0 opacity-0 py-0 border-transparent pointer-events-none mb-0"
                  : "max-h-12 opacity-100 px-2 pt-1 pb-1.5 border-b border-slate-200/80 dark:border-[#252836] mb-1"
              }`}
            >
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-wider uppercase block whitespace-nowrap">
                {section.section}
              </span>
            </div>

            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center w-full rounded-xl text-xs font-medium transition-colors duration-200 group p-1.5 ${
                      isActive
                        ? "bg-[#00d2b4]/15 text-teal-800 dark:text-[#00d2b4] font-bold border border-[#00d2b4]/30 shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#202330] border border-transparent"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon
                          className={`w-4 h-4 transition-colors shrink-0 ${
                            isActive
                              ? "text-[#00d2b4]"
                              : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                          }`}
                        />
                      </div>
                      <span
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                          isCollapsed
                            ? "max-w-0 opacity-0 -translate-x-3 pointer-events-none ml-0"
                            : "max-w-[160px] opacity-100 translate-x-0 ml-2.5 truncate"
                        }`}
                      >
                        {item.label}
                      </span>

                      {item.badge && (
                        <span
                          className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                            isActive
                              ? "bg-[#00d2b4] text-slate-950"
                              : "bg-blue-600 text-white"
                          } ${isCollapsed ? "hidden" : "inline-block"}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Role Info */}
      <div className="border-t border-slate-200 dark:border-[#222530] bg-slate-50 dark:bg-[#101217] px-4 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
            {user?.name || "System User"}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 shrink-0">v2.4.0</span>
      </div>
    </aside>
  );
};

export default LunoSidebar;
