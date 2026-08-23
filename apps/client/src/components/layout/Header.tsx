import React from "react";
import { Link } from "react-router-dom";
import { useCustomerAuth } from "../../hooks/useAuth";
import { Button, Badge } from "@nbfc/ui";

export const Header: React.FC = () => {
  const { customer, logout } = useCustomerAuth();

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
          A
        </div>
        <div>
          <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100 tracking-tight">Arohon Financial</span>
          <span className="block text-xs text-blue-600 font-semibold">Customer Loan Portal</span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Apply Loans</Link>
        <Link to="/application-status" className="hover:text-blue-600 transition-colors">Track Application</Link>
        <Link to="/document-upload" className="hover:text-blue-600 transition-colors">Upload Documents</Link>
        <Link to="/profile" className="hover:text-blue-600 transition-colors">My Profile</Link>
      </nav>

      <div className="flex items-center gap-4">
        {customer ? (
          <div className="flex items-center gap-3">
            <Badge variant="success" className="hidden sm:inline-flex">KYC Verified</Badge>
            <Button variant="outline" size="sm" onClick={logout}>Sign Out</Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button size="sm">Sign In / Register</Button>
          </Link>
        )}
      </div>
    </header>
  );
};
