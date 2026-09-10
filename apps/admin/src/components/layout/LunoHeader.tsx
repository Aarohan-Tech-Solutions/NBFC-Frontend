import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Maximize2,
  Globe,
  Moon,
  Sun,
  Bell,
  X,
  ChevronDown,
  Check,
  LogOut,
  UserCheck,
  ShieldCheck,
  Building,
  MapPin,
  GitBranch,
  Users,
  FileCheck2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuthStore, MOCK_USERS } from "../../stores/auth.store";
import { Role } from "@nbfc/shared-types";

interface LunoHeaderProps {
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const LunoHeader: React.FC<LunoHeaderProps> = ({
  onToggleSidebar,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, role, switchRole, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Close role menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoleMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const roleIcons: Record<Role, React.ElementType> = {
    [Role.SUPER_ADMIN]: ShieldCheck,
    [Role.COMPANY_ADMIN]: Building,
    [Role.AREA_MANAGER]: MapPin,
    [Role.BRANCH_MANAGER]: GitBranch,
    [Role.DSA]: Users,
    [Role.CONNECTOR]: UserCheck,
    [Role.STAFF]: FileCheck2,
    [Role.CUSTOMER]: Users,
  };

  const currentRole = role || Role.SUPER_ADMIN;
  const CurrentRoleIcon = roleIcons[currentRole] || ShieldCheck;
  const currentProfile = user || MOCK_USERS[currentRole];

  return (
    <header className="h-[76px] bg-white/95 dark:bg-[#14161c]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#222530] px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none w-full shrink-0 transition-colors duration-200 shadow-sm dark:shadow-none">
      {/* Left: Hamburger + NBFC Wordmark */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#1c1e27] hover:bg-slate-200 dark:hover:bg-[#252834] active:bg-slate-300 dark:active:bg-[#2b2e3d] border border-slate-200 dark:border-[#2b2e3c] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center tracking-widest font-black text-xl sm:text-2xl text-slate-800 dark:text-slate-300">
          <span>NB</span>
          <span className="text-[#00d2b4]">FC</span>
        </div>
      </div>

      {/* Center: Search Field (Desktop) */}
      <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files, loans, DSAs or KYC records..."
            className="w-full bg-slate-100 hover:bg-slate-200/60 focus:bg-white dark:bg-[#191b24] dark:hover:bg-[#1d202b] dark:focus:bg-[#1d202b] border border-slate-200 dark:border-[#292c3a] focus:border-[#00d2b4] dark:focus:border-[#00d2b4] rounded-xl pl-11 pr-4 py-2 text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all shadow-inner dark:shadow-none"
          />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="absolute inset-x-0 top-0 h-[76px] bg-white dark:bg-[#14161c] px-4 flex items-center gap-2 z-40 md:hidden animate-in fade-in duration-200 border-b border-slate-200 dark:border-[#222530]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NBFC..."
              className="w-full bg-slate-100 dark:bg-[#191b24] border border-slate-200 dark:border-[#292c3a] focus:border-[#00d2b4] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
            />
          </div>
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Right: Role Switcher & Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3 text-slate-500 dark:text-slate-400 shrink-0">
        {/* Mobile Search Trigger Icon */}
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e202a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white md:hidden transition-colors"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* 🌟 DEV ROLE SWITCHER DROPDOWN */}
        <div className="relative" ref={roleDropdownRef}>
          <button
            onClick={() => setIsRoleMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 dark:bg-[#1c2234] dark:hover:bg-[#232b42] border border-blue-200 dark:border-blue-800/60 text-xs font-bold text-blue-700 dark:text-blue-300 transition-all shadow-sm"
            title="Switch Active Role (Dev Mode)"
          >
            <CurrentRoleIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[10px] text-blue-500 dark:text-blue-400 block font-normal">Active Role</span>
              <span className="font-extrabold text-blue-900 dark:text-blue-200">{currentProfile.roleLabel}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-blue-500" />
          </button>

          {/* Role Switcher Menu */}
          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#171922] border border-slate-200 dark:border-[#282c3c] rounded-2xl shadow-2xl z-50 p-2 divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Switch Active Role (Dev Affordance)
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Changes sidebar nav, route permissions & KPI dashboard
                </span>
              </div>

              <div className="py-1.5 space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                {(
                  [
                    Role.SUPER_ADMIN,
                    Role.COMPANY_ADMIN,
                    Role.AREA_MANAGER,
                    Role.BRANCH_MANAGER,
                    Role.DSA,
                    Role.CONNECTOR,
                    Role.STAFF,
                  ] as Role[]
                ).map((r) => {
                  const targetUser = MOCK_USERS[r];
                  const Icon = roleIcons[r];
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
                          ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/60 dark:border-blue-800/40"
                          : "hover:bg-slate-50 dark:hover:bg-[#1e212d] text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold block truncate">{targetUser.roleLabel}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
                            {targetUser.name} • {targetUser.scopeContext}
                          </span>
                        </div>
                      </div>

                      {isCurrent && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-1.5">
                <button
                  onClick={() => {
                    setIsRoleMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1e212d] rounded-xl transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Open Full Role Login Screen</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notification Pill */}
        <button
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1c1e27] hover:bg-slate-200 dark:hover:bg-[#252834] border border-slate-200 dark:border-[#2b2e3c] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm dark:shadow-none"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5 text-teal-600 dark:text-[#00d2b4]" />
          <span className="hidden sm:inline">Alerts</span>
          <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00d2b4] text-[#14161c] text-[10px] font-black flex items-center justify-center">
            5
          </span>
        </button>

        {/* Fullscreen Icon */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e202a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:flex"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Language Icon */}
        <button
          onClick={() => alert("Language: English (India / RBI Standards)")}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e202a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden md:flex"
          title="Region / Language"
        >
          <Globe className="w-4 h-4" />
        </button>

        {/* Theme Toggle Button (Light/Dark) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#1c1e27] hover:bg-slate-200 dark:hover:bg-[#252834] border border-slate-200 dark:border-[#2b2e3c] transition-all transform hover:scale-105 hidden sm:flex items-center justify-center shadow-sm dark:shadow-none"
          title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 hover:text-indigo-700" />
          )}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200 dark:border-[#242734]">
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-blue-600 to-[#00d2b4] flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-200 dark:ring-[#222530]">
              {currentProfile.avatarText || "US"}
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#00d2b4] ring-2 ring-white dark:ring-[#14161c] absolute -bottom-0.5 -right-0.5" />
          </div>
          <div className="hidden xl:block text-left max-w-[130px]">
            <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight truncate">
              {currentProfile.name}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
              {currentProfile.roleLabel}
            </span>
          </div>
        </div>

        {/* Logout Quick Button */}
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

export default LunoHeader;
