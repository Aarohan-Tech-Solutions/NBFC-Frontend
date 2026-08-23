import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";

export const FloatingSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-32px)] sm:w-80 max-w-sm bg-white dark:bg-[#1a1c24] border border-slate-200 dark:border-[#2b2e3b] rounded-2xl shadow-2xl p-4 text-xs space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2b2e3b] pb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00d2b4] animate-pulse" />
              <span className="font-bold text-slate-900 dark:text-white">Live NBFC Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-600 dark:text-slate-300">
            Hi Allie! How can our CRM &amp; Technical Support team assist you today?
          </p>

          <div className="space-y-1.5">
            <button
              onClick={() => alert("Connecting to Priority Support Agent...")}
              className="w-full text-left p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-[#222530] dark:hover:bg-[#2a2d3b] border border-slate-200/60 dark:border-transparent text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between font-medium"
            >
              <span>Talk to an Expert</span>
              <span className="text-[#00d2b4] font-semibold">&rarr;</span>
            </button>
            <button
              onClick={() => alert("Opening NBFC Documentation...")}
              className="w-full text-left p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-[#222530] dark:hover:bg-[#2a2d3b] border border-slate-200/60 dark:border-transparent text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between font-medium"
            >
              <span>Explore Help Docs</span>
              <span className="text-blue-500 dark:text-blue-400 font-semibold">&rarr;</span>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Support</span>
      </button>
    </div>
  );
};
