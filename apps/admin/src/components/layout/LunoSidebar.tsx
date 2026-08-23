import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  UserCheck,
  BarChart2,
  Target,
  Users,
  Building,
  FolderGit2,
  Activity,
  Shield,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Mail,
  Bell,
  MessageSquare,
  Settings,
  Power,
  X,
} from "lucide-react";

interface LunoSidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const LunoSidebar: React.FC<LunoSidebarProps> = ({
  isCollapsed = false,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [selectedProject, setSelectedProject] = useState("NBFC Banking Core");

  const mainNavItems = [
    { label: "My Dashboard", path: "/dashboard", icon: LayoutDashboard, hasChevron: false, activeExact: true },
    { label: "Applications", path: "/loans", icon: FileText, hasChevron: true },
    { label: "Account", path: "/users", icon: UserCheck, hasChevron: true },
    { label: "Analytics", path: "/reports", icon: BarChart2, hasChevron: true },
    { label: "Leads", path: "/leads", icon: Target, hasChevron: false },
    { label: "Customers", path: "/customers", icon: Users, hasChevron: true },
    { label: "Vendors", path: "/dsa", icon: Building, hasChevron: false },
    { label: "Projects", path: "/company", icon: FolderGit2, hasChevron: true },
    { label: "Activities", path: "/crm", icon: Activity, hasChevron: false },
  ];

  const resourceItems = [
    { label: "Authentication", path: "/roles-permissions", icon: Shield },
    { label: "Documentation", path: "/documents", icon: BookOpen },
    { label: "Changelog", path: "/cms", icon: Sparkles, badge: "v1.2.0" },
  ];

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
      {/* Top Logo / Header Area */}
      <div className="h-[76px] border-b border-slate-200 dark:border-[#222530] flex items-center px-4 justify-between transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] overflow-hidden shrink-0">
        <div className="flex items-center min-w-0">
          {/* Circular Brand Logo Badge */}
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30 flex items-center justify-center text-white font-black text-lg ring-2 ring-blue-400/30 shrink-0 transform hover:scale-105 transition-transform cursor-pointer"
            title="CRM Admin"
          >
            C
          </div>

          {/* Expanded Title + Subtitle */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              isCollapsed
                ? "max-w-0 opacity-0 -translate-x-4 pointer-events-none ml-0"
                : "max-w-[160px] opacity-100 translate-x-0 ml-3"
            }`}
          >
            <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
              CRM Admin
            </h1>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block whitespace-nowrap">
              NBFC Portal
            </span>
          </div>
        </div>

        {/* Right Header Controls (Options & Mobile Close) */}
        <div
          className={`flex items-center gap-1.5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
            isCollapsed
              ? "max-w-0 opacity-0 pointer-events-none overflow-hidden"
              : "max-w-[80px] opacity-100"
          }`}
        >
          <button
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1c1e27] hover:bg-slate-200 dark:hover:bg-[#252834] border border-slate-200 dark:border-[#2b2e3c] flex items-center justify-center text-blue-600 dark:text-blue-500 transition-colors shadow-sm shrink-0"
            title="Sidebar Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* Mobile Close X button */}
          <button
            onClick={onCloseMobile}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1c1e27] hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-slate-200 dark:border-[#2b2e3c] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 lg:hidden transition-colors shrink-0"
            title="Close Navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Selector (Smooth collapsible height & opacity) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shrink-0 ${
          isCollapsed
            ? "max-h-0 opacity-0 -translate-y-2 pointer-events-none py-0 px-4"
            : "max-h-24 opacity-100 translate-y-0 py-4 px-4"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 min-w-0">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full appearance-none bg-slate-100 hover:bg-slate-200/60 focus:bg-white dark:bg-[#181a22] dark:hover:bg-[#1d202a] border border-slate-200 dark:border-[#292c3a] rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#00d2b4] transition-colors cursor-pointer pr-8 truncate shadow-sm dark:shadow-none"
            >
              <option value="NBFC Banking Core">Select Project (NBFC)</option>
              <option value="NBFC Lending Portal">NBFC Lending Portal</option>
              <option value="Retail Loan CRM">Retail Loan CRM</option>
              <option value="DSA Partner Network">DSA Partner Network</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => alert("Create New CRM Project")}
            className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105"
            title="Add New Project"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-3 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]">
        {/* Main Navigation Container */}
        <div className="bg-slate-100/70 dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl shadow-inner p-2 space-y-1 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]">
          {/* Section Header */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              isCollapsed
                ? "max-h-0 opacity-0 py-0 border-transparent pointer-events-none mb-0"
                : "max-h-16 opacity-100 px-2 pt-1 pb-2 border-b border-slate-200/80 dark:border-[#252836] mb-1"
            }`}
          >
            <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 tracking-wider uppercase block whitespace-nowrap">
              MAIN
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5 whitespace-nowrap truncate">
              Unique dashboard designs
            </span>
          </div>

          {/* Nav Items List */}
          <div className="space-y-0.5">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center w-full rounded-xl text-xs font-medium transition-colors duration-200 group p-1.5 ${
                    isActive
                      ? "bg-[#00d2b4]/15 text-teal-800 dark:text-[#00d2b4] font-semibold border border-[#00d2b4]/30 shadow-sm"
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

                    <div
                      className={`ml-auto overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shrink-0 ${
                        isCollapsed
                          ? "max-w-0 opacity-0 pointer-events-none scale-75"
                          : "max-w-[40px] opacity-100 scale-100 pl-1"
                      }`}
                    >
                      {item.hasChevron && (
                        <ChevronRight
                          className={`w-3.5 h-3.5 ${
                            isActive
                              ? "text-[#00d2b4]"
                              : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                          }`}
                        />
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Resources Panel */}
        <div className="bg-slate-100/70 dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl shadow-inner p-2 space-y-1 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]">
          {/* Section Header */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              isCollapsed
                ? "max-h-0 opacity-0 py-0 border-transparent pointer-events-none mb-0"
                : "max-h-16 opacity-100 px-2 pt-1 pb-2 border-b border-slate-200/80 dark:border-[#252836] mb-1"
            }`}
          >
            <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 tracking-wider uppercase block whitespace-nowrap">
              RESOURCES
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5 whitespace-nowrap truncate">
              you need to know about NBFC
            </span>
          </div>

          {/* Resources Items List */}
          <div className="space-y-0.5">
            {resourceItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center w-full rounded-xl text-xs font-medium transition-colors duration-200 group p-1.5 ${
                    isActive
                      ? "bg-[#00d2b4]/15 text-teal-800 dark:text-[#00d2b4] font-semibold border border-[#00d2b4]/30 shadow-sm"
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

                    <div
                      className={`ml-auto overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shrink-0 ${
                        isCollapsed
                          ? "max-w-0 opacity-0 pointer-events-none scale-75"
                          : "max-w-[60px] opacity-100 scale-100 pl-1"
                      }`}
                    >
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold shadow-sm shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Bottom Utility Area */}
      <div className="border-t border-slate-200 dark:border-[#222530] bg-slate-50 dark:bg-[#101217] px-3 py-3 flex items-center justify-around overflow-hidden shrink-0 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]">
        <button
          className={`w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-[#1e202a] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shrink-0 ${
            isCollapsed
              ? "max-w-0 opacity-0 pointer-events-none -translate-x-2 overflow-hidden m-0 p-0"
              : "max-w-[32px] opacity-100 translate-x-0"
          }`}
          title="Inbox Messages"
        >
          <Mail className="w-4 h-4" />
        </button>
        <button
          className={`w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-[#1e202a] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shrink-0 ${
            isCollapsed
              ? "max-w-0 opacity-0 pointer-events-none -translate-x-2 overflow-hidden m-0 p-0"
              : "max-w-[32px] opacity-100 translate-x-0"
          }`}
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>
        <button
          className={`w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-[#1e202a] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shrink-0 ${
            isCollapsed
              ? "max-w-0 opacity-0 pointer-events-none -translate-x-2 overflow-hidden m-0 p-0"
              : "max-w-[32px] opacity-100 translate-x-0"
          }`}
          title="Chat Channel"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
        <button
          className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-[#1e202a] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors shrink-0"
          title="Admin Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (confirm("Sign out of CRM Admin session?")) {
              window.location.reload();
            }
          }}
          className="w-8 h-8 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/40 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center justify-center transition-colors shrink-0"
          title="Logout"
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
