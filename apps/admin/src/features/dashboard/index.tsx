import React, { useState } from "react";
import { LunoKPIGrid } from "./components/LunoKPIGrid";
import { SalesStatisticsChart } from "./components/SalesStatisticsChart";
import { OutboundCallsChart } from "./components/OutboundCallsChart";
import { TopSellingPlansDonut } from "./components/TopSellingPlansDonut";
import { RunningProjectsCard } from "./components/RunningProjectsCard";
import { WorkDeadlinesTable } from "./components/WorkDeadlinesTable";
import { LunoFooter } from "../../components/layout/LunoFooter";
import { FloatingSupport } from "../../components/layout/FloatingSupport";
import { Calendar, RotateCcw, Download, Sparkles } from "lucide-react";
import { useAuthStore } from "../../stores/auth.store";
import { Role } from "@nbfc/shared-types";

export const DashboardFeature: React.FC = () => {
  const [dateRange] = useState("Aug 01, 2026 - Aug 23, 2026");
  const { user, role } = useAuthStore();
  const currentRole = role || Role.SUPER_ADMIN;

  const getSubheadline = () => {
    switch (currentRole) {
      case Role.STAFF:
        return "You have 18 pending verification tasks, with 3 files approaching SLA deadline.";
      case Role.CONNECTOR:
        return "You have 42 referred leads with ₹ 32,000 pending commission awaiting payout.";
      case Role.DSA:
        return "45 active files in pipeline with ₹ 1.84 Cr disbursed volume across your team.";
      case Role.BRANCH_MANAGER:
        return "Kolkata Central Branch: 54 files active, daily sanction capacity at 86%.";
      case Role.AREA_MANAGER:
        return "West Bengal East Cluster: 8 branches active, target achievement running at 108%.";
      case Role.COMPANY_ADMIN:
        return "Arohon Financial Corporate: Nationwide loan book is compliant and active across 6 areas.";
      case Role.SUPER_ADMIN:
      default:
        return "Real-time loan origination metrics across all 6 regions, 34 branches, and 184 partner DSAs.";
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* 4. Dashboard Content Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className="text-[#00d2b4] hover:underline cursor-pointer">Arohon NBFC</span>
            <span className="text-slate-400 dark:text-slate-500">/ {user?.roleLabel || "Dashboard"}</span>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 flex items-center gap-2">
            <span>Welcome back, {user?.name || "Allie"}!</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {user?.roleLabel || "Super Admin"}
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {getSubheadline()}
          </p>
        </div>

        {/* Right Side: Horizontal Date-Range Control */}
        <div className="flex items-center self-start sm:self-center w-full sm:w-auto shadow-sm dark:shadow-none">
          {/* Rectangular Date Field */}
          <div className="bg-white dark:bg-[#171922] border border-slate-200 dark:border-[#252836] border-r-0 rounded-l-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 whitespace-nowrap">
            <span>{dateRange}</span>
          </div>

          {/* Attached Action Section */}
          <div className="bg-slate-100 dark:bg-[#202330] border border-slate-200 dark:border-[#252836] rounded-r-xl px-2 py-1.5 flex items-center gap-1 text-slate-600 dark:text-slate-300 shrink-0">
            <button
              onClick={() => alert("Select Custom Date Range")}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-[#2a2e3f] hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Select Dates"
            >
              <Calendar className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => alert("Refreshed NBFC Operational Metrics")}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-[#2a2e3f] hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => alert("Exporting PDF / Excel NBFC Portfolio Report")}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-[#2a2e3f] hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Export Report"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Role-Specific NBFC KPI Card Grid */}
      <LunoKPIGrid />

      {/* 6. Main Analytics Row (Two-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <SalesStatisticsChart />
        <OutboundCallsChart />
      </div>

      {/* 7. Lower Dashboard Row (Three-Column Layout: 1 : 1.25 : 1.25) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-4">
          <TopSellingPlansDonut />
        </div>
        <div className="lg:col-span-4">
          <RunningProjectsCard />
        </div>
        <div className="md:col-span-2 lg:col-span-4">
          <WorkDeadlinesTable />
        </div>
      </div>

      {/* 8. Footer */}
      <LunoFooter />

      {/* 9. Floating Support Button */}
      <FloatingSupport />
    </div>
  );
};

export default DashboardFeature;
