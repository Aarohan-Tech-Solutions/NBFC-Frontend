import React from "react";
import {
  Users,
  Box,
  Target,
  DollarSign,
  Briefcase,
  UserCheck,
  FolderGit2,
  ShieldCheck,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface KPICardItem {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export const LunoKPIGrid: React.FC = () => {
  const kpis: KPICardItem[] = [
    // Row 1
    {
      id: "1",
      title: "New Customers",
      value: "2,450",
      change: "+12.4%",
      isPositive: true,
      icon: Users,
    },
    {
      id: "2",
      title: "New Products",
      value: "380",
      change: "+4.8%",
      isPositive: true,
      icon: Box,
    },
    {
      id: "3",
      title: "New Leads",
      value: "1,890",
      change: "+8.2%",
      isPositive: true,
      icon: Target,
    },
    {
      id: "4",
      title: "Today's Profit",
      value: "$8,450",
      change: "+15.3%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      id: "5",
      title: "Contracts Close",
      value: "42",
      change: "-2.1%",
      isPositive: false,
      icon: Briefcase,
    },

    // Row 2
    {
      id: "6",
      title: "Active Client",
      value: "1,280",
      change: "+5.6%",
      isPositive: true,
      icon: UserCheck,
    },
    {
      id: "7",
      title: "Running Project",
      value: "64",
      change: "+10.1%",
      isPositive: true,
      icon: FolderGit2,
    },
    {
      id: "8",
      title: "Active Admin",
      value: "18",
      change: "+0.0%",
      isPositive: true,
      icon: ShieldCheck,
    },
    {
      id: "9",
      title: "Total Expenses",
      value: "$24,800",
      change: "-3.4%",
      isPositive: false,
      icon: CreditCard,
    },
    {
      id: "10",
      title: "Avg Contract Value",
      value: "$14,250",
      change: "+7.9%",
      isPositive: true,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-[#171922] hover:bg-slate-50 dark:hover:bg-[#1b1e29] border border-slate-200/80 dark:border-[#252836] hover:border-slate-300 dark:hover:border-[#2f3346] rounded-2xl p-4 flex items-center gap-3.5 transition-all shadow-sm group"
          >
            {/* Left Circular Icon Container */}
            <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0 group-hover:scale-105 transition-transform">
              <IconComponent className="w-5 h-5" />
            </div>

            {/* Right Text Block */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block truncate">
                {card.title}
              </span>
              <div className="flex items-baseline justify-between gap-1 mt-0.5">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  {card.value}
                </span>
                <span
                  className={`text-[11px] font-bold flex items-center shrink-0 ${
                    card.isPositive ? "text-teal-600 dark:text-[#00d2b4]" : "text-rose-500"
                  }`}
                >
                  {card.isPositive ? (
                    <ArrowUpRight className="w-3 h-3 inline" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 inline" />
                  )}
                  {card.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
