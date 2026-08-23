import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10">{children}</main>
      <Footer />
    </div>
  );
};
