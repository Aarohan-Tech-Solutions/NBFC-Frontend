import React, { useState } from "react";
import {
  Menu,
  Search,
  Maximize2,
  Globe,
  LayoutGrid,
  Moon,
  Sun,
  Settings,
  Bell,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface LunoHeaderProps {
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const LunoHeader: React.FC<LunoHeaderProps> = ({
  isSidebarCollapsed = false,
  onToggleSidebar,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

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

      {/* Center: Large Horizontal Search Field (Desktop) */}
      <div className="flex-1 max-w-xl mx-4 lg:mx-8 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter your search key word"
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
              placeholder="Search in NBFC..."
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

      {/* Right: Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 text-slate-500 dark:text-slate-400 shrink-0">
        {/* Mobile Search Trigger Icon */}
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e202a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white md:hidden transition-colors"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Pill */}
        <button
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1c1e27] hover:bg-slate-200 dark:hover:bg-[#252834] border border-slate-200 dark:border-[#2b2e3c] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm dark:shadow-none"
          title="7 Notifications"
        >
          <Bell className="w-3.5 h-3.5 text-teal-600 dark:text-[#00d2b4]" />
          <span className="hidden sm:inline">Notifications</span>
          <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#00d2b4] text-[#14161c] text-[10px] font-black flex items-center justify-center">
            7
          </span>
        </button>

        {/* Fullscreen Icon (Hidden on small mobile) */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e202a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:flex"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Language Icon (Hidden on small mobile) */}
        <button
          onClick={() => alert("Language: English (US)")}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e202a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden md:flex"
          title="Change Language"
        >
          <Globe className="w-4 h-4" />
        </button>

        {/* App Launcher / Grid Icon */}
        <button
          onClick={() => alert("Open NBFC Apps Suite")}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e202a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:flex"
          title="App Launcher"
        >
          <LayoutGrid className="w-4 h-4" />
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
              AL
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#00d2b4] ring-2 ring-white dark:ring-[#14161c] absolute -bottom-0.5 -right-0.5" />
          </div>
          <div className="hidden xl:block text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">Allie Grater</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Super Admin</span>
          </div>
        </div>

        {/* Settings Gear Icon */}
        <button
          onClick={() => alert("Open System Configuration")}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e202a] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
