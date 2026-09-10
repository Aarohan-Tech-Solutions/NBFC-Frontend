import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOfficialAuthStore, MOCK_OFFICIALS } from "../stores/auth.store";
import { Role } from "@nbfc/shared-types";
import { Button, Input } from "@nbfc/ui";
import { ShieldCheck, FileCheck2, Building, ArrowRight, Lock } from "lucide-react";

export const OfficialLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useOfficialAuthStore();
  const [selectedRole, setSelectedRole] = useState<Role.BRANCH_UNDERWRITING_HEAD | Role.SENIOR_CREDIT_OFFICER | Role.VERIFICATION_OFFICER | Role.DISBURSEMENT_OFFICER>(
    Role.BRANCH_UNDERWRITING_HEAD
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRole);
    navigate("/dashboard");
  };

  type OfficialRole =
    | Role.BRANCH_UNDERWRITING_HEAD
    | Role.SENIOR_CREDIT_OFFICER
    | Role.VERIFICATION_OFFICER
    | Role.DISBURSEMENT_OFFICER;

  const rolesList: {
    role: OfficialRole;
    title: string;
    desc: string;
    icon: React.ElementType;
  }[] = [
    {
      role: Role.BRANCH_UNDERWRITING_HEAD,
      title: "Branch Underwriting Head",
      desc: "Final sanction delegation authority (up to ₹50L), policy exception approvals, adverse action notice sign-off.",
      icon: ShieldCheck,
    },
    {
      role: Role.SENIOR_CREDIT_OFFICER,
      title: "Senior Credit Officer",
      desc: "Credit risk appraisal, CIBIL bureau scoring, FOIR / DTI analysis, and sanction sheet preparation.",
      icon: FileCheck2,
    },
    {
      role: Role.VERIFICATION_OFFICER,
      title: "Verification & Field Inspector",
      desc: "On-site KYC inspection, property title 30-year search, and 2-guarantor checks.",
      icon: ShieldCheck,
    },
    {
      role: Role.DISBURSEMENT_OFFICER,
      title: "Disbursement & Operations Desk",
      desc: "Corporate escrow account release, fee deduction audit, and RTGS payment batch authorization.",
      icon: Building,
    },
  ];


  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-black">
      <div className="w-full max-w-2xl bg-[#13151f] p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-xl mx-auto shadow-lg shadow-emerald-500/30">
            B
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Bank & NBFC Official Underwriting Portal
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Authorized access only. Select your official persona to authenticate into the Underwriting & Credit Risk subsystem.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Select Official Persona (Development Direct Sign-In)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rolesList.map((item) => {
                const isSelected = selectedRole === item.role;
                const Icon = item.icon;
                return (
                  <div
                    key={item.role}
                    onClick={() => setSelectedRole(item.role)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500"
                        : "bg-[#181a26] border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isSelected ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs text-white truncate">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5">
              <span>Sign In to Underwriting Portal</span>
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfficialLoginPage;
