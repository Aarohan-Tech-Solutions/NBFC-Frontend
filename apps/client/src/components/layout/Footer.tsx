import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 sm:px-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <div className="font-bold text-sm text-white">Arohon Financial Services Private Limited</div>
          <p className="mt-1">RBI Registered Non-Banking Financial Company (NBFC-ND-SI)</p>
        </div>
        <div className="text-center sm:text-right">
          <p>&copy; {new Date().getFullYear()} Arohon Financial. All rights reserved.</p>
          <p className="mt-1 text-slate-500">Privacy Policy | Terms of Service | Grievance Redressal</p>
        </div>
      </div>
    </footer>
  );
};
