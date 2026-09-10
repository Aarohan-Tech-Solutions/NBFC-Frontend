import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Maximize2,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  Check,
  LogOut,
  ShieldCheck,
  FileCheck2,
  Building,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useOfficialAuthStore, MOCK_OFFICIALS } from "../../stores/auth.store";
import { Role } from "@nbfc/shared-types";

interface BankOfficialHeaderProps {
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const BankOfficialHeader: React.FC<BankOfficialHeaderProps> = ({ onToggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, role, switchRole, logout } = useOfficialAuthStore();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleIcons = {
    [Role.BRANCH_UNDERWRITING_HEAD]: ShieldCheck,
    [Role.SENIOR_CREDIT_OFFICER]: FileCheck2,
    [Role.VERIFICATION_OFFICER]: ShieldCheck,
    [Role.DISBURSEMENT_OFFICER]: Building,
  };

  const currentRole = (role as any) || Role.BRANCH_UNDERWRITING_HEAD;
  const CurrentRoleIcon = (roleIcons as any)[currentRole] || ShieldCheck;
  const currentProfile = user || MOCK_OFFICIALS[Role.BRANCH_UNDERWRITING_HEAD];

  return (
    <header className="h-[76px] bg-white/95 dark:bg-[#12141c]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#20232e] px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none w-full shrink-0 transition-colors duration-200 shadow-sm dark:shadow-none">
      {/* Left: Hamburger + Brand Wordmark */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#1a1d26] hover:bg-slate-200 dark:hover:bg-[#222632] border border-slate-200 dark:border-[#282c38] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center tracking-widest font-black text-xl sm:text-2xl text-slate-800 dark:text-slate-300">
          <span>CREDIT</span>
          <span className="text-emerald-500 ml-1">DESK</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 text-slate-500 dark:text-slate-400 shrink-0">
        {/* 🌟 DEV ROLE SWITCHER DROPDOWN */}
        <div className="relative" ref={roleDropdownRef}>
          <button
            onClick={() => setIsRoleMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 dark:bg-[#172422] dark:hover:bg-[#1d302c] border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold text-emerald-800 dark:text-emerald-300 transition-all shadow-sm"
            title="Switch Official Persona"
          >
            <CurrentRoleIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-normal">Active Official</span>
              <span className="font-extrabold text-emerald-950 dark:text-emerald-200">{currentProfile.roleLabel}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-emerald-600" />
          </button>

          {/* Role Switcher Menu */}
          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#161822] border border-slate-200 dark:border-[#262938] rounded-2xl shadow-2xl z-50 p-2 divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Switch Bank Official Role
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Simulates specific underwriting permissions & action desks
                </span>
              </div>

              <div className="py-1.5 space-y-1">
                {(
                  [
                    Role.BRANCH_UNDERWRITING_HEAD,
                    Role.SENIOR_CREDIT_OFFICER,
                    Role.VERIFICATION_OFFICER,
                    Role.DISBURSEMENT_OFFICER,
                  ] as (Role.BRANCH_UNDERWRITING_HEAD | Role.SENIOR_CREDIT_OFFICER | Role.VERIFICATION_OFFICER | Role.DISBURSEMENT_OFFICER)[]
                ).map((r) => {
                  const targetUser = MOCK_OFFICIALS[r];
                  const Icon = (roleIcons as any)[r] || ShieldCheck;
                  const isCurrent = currentRole === r;

                  return (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                        isCurrent
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200/60 dark:border-emerald-800/40"
                          : "hover:bg-slate-50 dark:hover:bg-[#1d202d] text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold block truncate">{targetUser.roleLabel}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
                            {targetUser.name} • Limit: ₹{(targetUser.sanctionLimit / 100000).toFixed(0)}L
                          </span>
                        </div>
                      </div>

                      {isCurrent && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#1a1d26] hover:bg-slate-200 dark:hover:bg-[#222632] border border-slate-200 dark:border-[#282c38] transition-all transform hover:scale-105 flex items-center justify-center shadow-sm"
          title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 hover:text-indigo-700" />
          )}
        </button>

        {/* Official Avatar */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200 dark:border-[#242734]">
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-200 dark:ring-[#222530]">
              {currentProfile.avatarText || "BO"}
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#12141c] absolute -bottom-0.5 -right-0.5" />
          </div>
          <div className="hidden xl:block text-left max-w-[130px]">
            <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight truncate">
              {currentProfile.name}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block truncate font-semibold">
              {currentProfile.roleLabel.split("&")[0]}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
