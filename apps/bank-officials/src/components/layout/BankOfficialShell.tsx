import React, { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BankOfficialSidebar } from "./BankOfficialSidebar";
import { BankOfficialHeader } from "./BankOfficialHeader";

export const BankOfficialShell: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c0d12] text-slate-900 dark:text-slate-100 flex font-sans antialiased selection:bg-emerald-500/30 selection:text-white relative overflow-x-hidden transition-colors duration-200">
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <BankOfficialSidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 transition-[margin-left] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
          isSidebarCollapsed ? "lg:ml-[88px]" : "lg:ml-[280px]"
        }`}
      >
        <BankOfficialHeader
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />

        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-12 flex-1 min-h-[calc(100vh-76px)] max-w-[100vw] overflow-x-hidden">
          <Suspense
            fallback={
              <div className="p-16 text-center text-slate-400 font-semibold text-xs flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Loading Underwriting Desk...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
