import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  Stamp,
  Wallet,
  AlertOctagon,
  BarChart3,
  X,
  Shield,
  Building,
} from "lucide-react";
import { useOfficialAuthStore } from "../../stores/auth.store";
import { Role } from "@nbfc/shared-types";

interface BankOfficialSidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  allowedRoles?: Role[];
}

export const BankOfficialSidebar: React.FC<BankOfficialSidebarProps> = ({
  isCollapsed = false,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { user, role } = useOfficialAuthStore();

  const navSections: { section: string; items: NavItem[] }[] = [
    {
      section: "UNDERWRITING DESK",
      items: [
        { label: "Official Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Loan Pipeline Queue", path: "/queue", icon: FileText, badge: "6 Active" },
        { label: "Verification Desk", path: "/verification", icon: CheckCircle2, badge: "5 Tasks" },
      ],
    },
    {
      section: "CREDIT & DECISIONING",
      items: [
        {
          label: "Sanction Approval",
          path: "/sanction",
          icon: Stamp,
          allowedRoles: [Role.BRANCH_UNDERWRITING_HEAD, Role.SENIOR_CREDIT_OFFICER, Role.SUPER_ADMIN],
        },
        {
          label: "Disbursement Release",
          path: "/disbursement",
          icon: Wallet,
          allowedRoles: [Role.BRANCH_UNDERWRITING_HEAD, Role.DISBURSEMENT_OFFICER, Role.SUPER_ADMIN],
        },
        {
          label: "Rejection Audit",
          path: "/rejections",
          icon: AlertOctagon,
        },
      ],
    },
    {
      section: "PORTFOLIO GOVERNANCE",
      items: [
        { label: "Underwriting Reports", path: "/reports", icon: BarChart3 },
      ],
    },
  ];

  return (
    <aside
      className={`bg-white dark:bg-[#111319] text-slate-800 dark:text-slate-200 border-r border-slate-200/80 dark:border-[#20232e] flex flex-col h-screen fixed left-0 top-0 bottom-0 select-none overflow-hidden transition-[width,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] will-change-[width,transform] z-40 shadow-sm dark:shadow-none ${
        isMobileOpen
          ? "translate-x-0 w-[280px] sm:w-[300px] shadow-2xl"
          : "-translate-x-full lg:translate-x-0"
      } ${isCollapsed ? "lg:w-[88px]" : "lg:w-[280px]"}`}
    >
      {/* Brand Header */}
      <div className="h-[76px] border-b border-slate-200 dark:border-[#20232e] flex items-center px-4 justify-between transition-all duration-300 shrink-0">
        <div className="flex items-center min-w-0">
          <div
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-lg shadow-emerald-600/30 flex items-center justify-center text-white font-black text-lg ring-2 ring-emerald-400/30 shrink-0"
            title="Arohon Bank Official Panel"
          >
            B
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isCollapsed
                ? "max-w-0 opacity-0 -translate-x-4 pointer-events-none ml-0"
                : "max-w-[170px] opacity-100 translate-x-0 ml-3"
            }`}
          >
            <h1 className="text-sm font-black text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
              Bank Underwriting
            </h1>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block whitespace-nowrap">
              {user?.roleLabel ? user.roleLabel.split("&")[0] : "Official Portal"}
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1a1d26] hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-slate-200 dark:border-[#282c38] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 lg:hidden transition-colors shrink-0"
          title="Close Navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scope / Branch Assignment Badge */}
      <div
        className={`overflow-hidden transition-all duration-300 shrink-0 ${
          isCollapsed
            ? "max-h-0 opacity-0 -translate-y-2 pointer-events-none py-0 px-4"
            : "max-h-24 opacity-100 translate-y-0 py-3 px-4"
        }`}
      >
        <div className="bg-slate-100/90 dark:bg-[#161822] border border-slate-200/80 dark:border-[#242736] rounded-xl px-3 py-2 text-xs flex items-center gap-2.5">
          <Building className="w-4 h-4 text-emerald-500 shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase block tracking-wider">
              Assigned Branch
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200 block truncate text-[11px]">
              {user?.assignedBranch || "Kolkata Central Main Branch"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-4">
        {navSections.map((section, sIdx) => (
          <div
            key={sIdx}
            className="bg-slate-100/60 dark:bg-[#151720] border border-slate-200/80 dark:border-[#222532] rounded-2xl p-2 space-y-1"
          >
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isCollapsed
                  ? "max-h-0 opacity-0 py-0 border-transparent pointer-events-none mb-0"
                  : "max-h-12 opacity-100 px-2 pt-1 pb-1.5 border-b border-slate-200/80 dark:border-[#222532] mb-1"
              }`}
            >
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-wider uppercase block whitespace-nowrap">
                {section.section}
              </span>
            </div>

            <div className="space-y-0.5">
              {section.items
                .filter((item) => !item.allowedRoles || (role && item.allowedRoles.includes(role)))
                .map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center w-full rounded-xl text-xs font-medium transition-colors duration-200 group p-1.5 ${
                        isActive
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-500/30 shadow-sm"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#1d202c] border border-transparent"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                          <item.icon
                            className={`w-4 h-4 transition-colors shrink-0 ${
                              isActive
                                ? "text-emerald-500"
                                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                            }`}
                          />
                        </div>
                        <span
                          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                            isCollapsed
                              ? "max-w-0 opacity-0 -translate-x-3 pointer-events-none ml-0"
                              : "max-w-[150px] opacity-100 translate-x-0 ml-2.5 truncate"
                          }`}
                        >
                          {item.label}
                        </span>

                        {item.badge && (
                          <span
                            className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              isActive
                                ? "bg-emerald-500 text-slate-950"
                                : "bg-emerald-600 text-white"
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
      <div className="border-t border-slate-200 dark:border-[#20232e] bg-slate-50 dark:bg-[#0e1015] px-4 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
            {user?.name || "Official"}
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
          Limit: ₹{((user?.sanctionLimit || 0) / 100000).toFixed(0)}L
        </span>
      </div>
    </aside>
  );
};
