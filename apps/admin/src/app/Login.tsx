import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "@nbfc/shared-types";
import { useAuthStore, MOCK_USERS } from "../stores/auth.store";
import {
  ShieldCheck,
  Building,
  MapPin,
  GitBranch,
  Users,
  UserCheck,
  FileCheck2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const loginAs = useAuthStore((state) => state.loginAs);
  const [selectedRole, setSelectedRole] = useState<Role>(Role.SUPER_ADMIN);

  const roleCards = [
    {
      role: Role.SUPER_ADMIN,
      title: "Super Admin",
      desc: "Nationwide loan book, all areas, all branches, master configurations.",
      icon: ShieldCheck,
      color: "from-blue-600 to-indigo-700",
      badge: "Full Access",
      user: MOCK_USERS[Role.SUPER_ADMIN],
    },
    {
      role: Role.COMPANY_ADMIN,
      title: "Company Admin",
      desc: "Corporate legal identity, RBI compliance, SLA policies, partner networks.",
      icon: Building,
      color: "from-indigo-600 to-purple-700",
      badge: "Governance",
      user: MOCK_USERS[Role.COMPANY_ADMIN],
    },
    {
      role: Role.AREA_MANAGER,
      title: "Area Manager",
      desc: "Regional cluster (West Bengal East), target achievement & branch benchmarks.",
      icon: MapPin,
      color: "from-teal-600 to-emerald-700",
      badge: "Regional",
      user: MOCK_USERS[Role.AREA_MANAGER],
    },
    {
      role: Role.BRANCH_MANAGER,
      title: "Branch Manager",
      desc: "Kolkata Central branch, daily sanctions, branch DSA partners & staff roster.",
      icon: GitBranch,
      color: "from-cyan-600 to-blue-700",
      badge: "Branch Ops",
      user: MOCK_USERS[Role.BRANCH_MANAGER],
    },
    {
      role: Role.DSA,
      title: "DSA Partner",
      desc: "Apex Financial Solutions (DSA-1042), sourced leads, pipeline & commission.",
      icon: Users,
      color: "from-amber-500 to-orange-600",
      badge: "Channel Partner",
      user: MOCK_USERS[Role.DSA],
    },
    {
      role: Role.CONNECTOR,
      title: "Lead Connector",
      desc: "Freelance Tax Consultant (CON-312), referral lead submissions & payouts.",
      icon: UserCheck,
      color: "from-rose-500 to-pink-600",
      badge: "Referral Network",
      user: MOCK_USERS[Role.CONNECTOR],
    },
    {
      role: Role.STAFF,
      title: "Credit Staff / Underwriter",
      desc: "Assigned verification queue: KYC, Banking, Document, Field Inspection checks.",
      icon: FileCheck2,
      color: "from-emerald-600 to-teal-700",
      badge: "Verification Queue Only",
      user: MOCK_USERS[Role.STAFF],
    },
  ];

  const handleLogin = (role: Role) => {
    loginAs(role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-[#00d2b4]/30 selection:text-white font-sans antialiased p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-[#00d2b4] flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-600/30">
            A
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">Arohon NBFC</span>
            <span className="block text-[11px] text-[#00d2b4] font-medium">Loan Origination & DSA Command Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-[#00d2b4]" />
          <span>Interactive RBAC Demo Mode</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl w-full mx-auto my-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Select Your Role to Enter
          </h1>
          <p className="text-sm text-slate-400">
            Experience role-based dashboard metrics, restricted workflows, and dedicated operational queues tailored for each user tier.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleCards.map((card) => {
            const IconComp = card.icon;
            const isSelected = selectedRole === card.role;
            return (
              <div
                key={card.role}
                onClick={() => setSelectedRole(card.role)}
                className={`relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left group ${
                  isSelected
                    ? "bg-slate-900 border-[#00d2b4] shadow-xl shadow-[#00d2b4]/10 ring-1 ring-[#00d2b4]"
                    : "bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#00d2b4] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 truncate max-w-[170px]">
                    <span className="font-semibold text-slate-200 block truncate">{card.user.name}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{card.user.scopeContext}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogin(card.role);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                      isSelected
                        ? "bg-[#00d2b4] text-slate-950 hover:bg-[#00d2b4]/90"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <span>Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => handleLogin(selectedRole)}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-[#00d2b4] text-white font-black text-sm shadow-xl shadow-blue-600/30 hover:opacity-95 transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Continue as {MOCK_USERS[selectedRole].roleLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-slate-600 py-4 border-t border-slate-900 max-w-4xl mx-auto w-full">
        NBFC & Direct Selling Agent (DSA) Loan Management Platform • Role-Based Access Control Architecture
      </div>
    </div>
  );
};

export default LoginPage;
