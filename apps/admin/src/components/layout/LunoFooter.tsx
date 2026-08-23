import React from "react";

export const LunoFooter: React.FC = () => {
  return (
    <footer className="mt-12 pt-6 pb-8 border-t border-slate-200 dark:border-[#222530] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500 select-none transition-colors duration-200">
      {/* Left */}
      <div>
        <span>&copy; 2026 </span>
        <a
          href="#nbfc"
          onClick={(e) => e.preventDefault()}
          className="text-[#00d2b4] hover:text-blue-500 dark:hover:text-blue-400 font-semibold transition-colors"
        >
          NBFC Banking Suite
        </a>
        <span>, All Rights Reserved.</span>
      </div>

      {/* Center */}
      <div className="flex items-center tracking-widest font-black text-sm text-slate-700 dark:text-slate-400">
        <span>NB</span>
        <span className="text-[#00d2b4]">FC</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
        <a
          href="#portfolio"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Portfolio
        </a>
        <a
          href="#license"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          License
        </a>
        <a
          href="#support"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Support
        </a>
        <a
          href="#faq"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          FAQ
        </a>
      </div>
    </footer>
  );
};
