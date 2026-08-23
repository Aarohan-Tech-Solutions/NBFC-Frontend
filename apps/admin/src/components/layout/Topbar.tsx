import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUIStore } from "../../stores/ui.store";
import { Button, Badge } from "@nbfc/ui";

export const Topbar: React.FC = () => {
  const { user, logout } = useAuth();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={toggleSidebar}>
          ☰
        </Button>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Internal Admin Dashboard
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {user.name}
              </div>
              <div className="text-xs text-slate-500">{user.email}</div>
            </div>
            <Badge variant="neutral" className="uppercase text-[10px]">
              {user.role}
            </Badge>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
