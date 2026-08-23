import React from "react";
import { NavLink } from "react-router-dom";
import { getNavItemsForRole } from "../../constants/nav-config";
import { useAuth } from "../../hooks/useAuth";
import { useUIStore } from "../../stores/ui.store";
import { Badge } from "@nbfc/ui";

export const Sidebar: React.FC = () => {
  const { role } = useAuth();
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const navItems = getNavItemsForRole(role);

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide">NBFC DSA</h1>
          <p className="text-xs text-slate-400">Loan Management</p>
        </div>
        <Badge variant="info" className="uppercase text-[10px]">
          {role || "Guest"}
        </Badge>
      </div>

      {/* Dynamic Nav Menu driven by nav-config.ts mapping */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 text-center text-xs text-slate-500">
        v1.0.0 Monorepo Admin
      </div>
    </aside>
  );
};
