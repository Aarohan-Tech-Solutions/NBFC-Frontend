import React, { useState } from "react";
import { Drawer, Badge, Button, Tabs } from "@nbfc/ui";
import { formatCurrency } from "../../../lib/formatters";

export interface CustomerItem {
  id: string;
  customerCode: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  employmentType: "Salaried" | "Self-Employed Professional" | "Business Owner";
  employer: string;
  monthlyIncome: number;
  cibilScore: number;
  kycStatus: "Verified" | "Pending" | "Rejected";
  pan: string;
  aadhaar: string;
  address: string;
  activeLoans: number;
  totalBorrowed: number;
  createdAt: string;
}

interface Customer360DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerItem | null;
  onEdit: () => void;
}

export const Customer360Drawer: React.FC<Customer360DrawerProps> = ({
  isOpen,
  onClose,
  customer,
  onEdit,
}) => {
  const [subTab, setSubTab] = useState("profile");

  if (!customer) return null;

  const customerDocs = [
    { name: "Aadhaar Card (Front & Back)", type: "KYC", docNo: customer.aadhaar, status: customer.kycStatus, date: "10 Jul 2026" },
    { name: "PAN Card", type: "KYC", docNo: customer.pan, status: customer.kycStatus, date: "10 Jul 2026" },
    { name: "Customer Live Selfie with ID", type: "KYC", docNo: "BIOMETRIC-MATCH-99%", status: "Verified", date: "10 Jul 2026" },
    { name: "Last 6 Months Bank Statement", type: "Financial", docNo: "HDFC-STMT-6M", status: "Verified", date: "12 Jul 2026" },
    { name: "Salary Slips (Last 3 Months)", type: "Financial", docNo: "PAYSLIP-Q1", status: "Verified", date: "12 Jul 2026" },
  ];

  const loanHistory = [
    { appNo: "LA-9485", product: "Home Loan", amount: 4500000, tenure: "240 Months", roi: "8.65%", status: "Approved / Sanctioned", emi: 39500, outstanding: 4500000 },
    { appNo: "LA-8902", product: "Personal Loan", amount: 300000, tenure: "36 Months", roi: "12.5%", status: "Closed", emi: 10034, outstanding: 0 },
  ];

  const customerTimeline = [
    { title: "Home Loan Application Sanctioned", desc: "Sanction letter issued for ₹ 45,00,000 by Branch Manager", time: "15 Aug 2026, 04:30 PM", badge: "Sanctioned" },
    { title: "Bank & Income Verification Cleared", desc: "Average monthly balance ₹ 84,000 verified across 6 months", time: "14 Aug 2026, 11:15 AM", badge: "Verified" },
    { title: "KYC Documents Biometric Match", desc: "Aadhaar & PAN validated via NSDL / UIDAI API Gateway", time: "13 Aug 2026, 02:45 PM", badge: "KYC Pass" },
    { title: "New Loan Sourced via DSA", desc: "File submitted by Apex Financial Solutions (DSA-1042)", time: "12 Aug 2026, 10:00 AM", badge: "Sourced" },
  ];

  const crmFollowups = [
    { type: "Phone Call", outcome: "Sanction discussion", agent: "Subhashis Roy", notes: "Customer agreed on 8.65% ROI. Property legal documents collected.", date: "15 Aug 2026" },
    { type: "WhatsApp", outcome: "Document reminder", agent: "System Bot", notes: "Salary slips received on automated portal link.", date: "13 Aug 2026" },
  ];

  const tabs = [
    { id: "profile", label: "Customer Profile" },
    { id: "documents", label: "Customer Documents" },
    { id: "timeline", label: "Customer Timeline" },
    { id: "loans", label: "Loan History" },
    { id: "crm", label: "Follow-up History" },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${customer.name} (${customer.customerCode})`}
      description={`CIBIL: ${customer.cibilScore} • ${customer.employmentType} • ${customer.city}`}
      size="lg"
    >
      <div className="space-y-5">
        <Tabs tabs={tabs} activeTab={subTab} onChange={setSubTab} />

        {/* Profile */}
        {subTab === "profile" && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center">
                    {customer.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{customer.name}</h3>
                    <p className="text-xs text-slate-500">{customer.email} • {customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={customer.cibilScore >= 750 ? "success" : "warning"}>
                    CIBIL {customer.cibilScore}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={onEdit}>
                    Edit
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div>
                  <span className="text-slate-400">Employment</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{customer.employmentType}</p>
                </div>
                <div>
                  <span className="text-slate-400">Employer / Business</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{customer.employer}</p>
                </div>
                <div>
                  <span className="text-slate-400">Monthly Net Income</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(customer.monthlyIncome)}</p>
                </div>
                <div>
                  <span className="text-slate-400">KYC Status</span>
                  <p className="font-bold text-emerald-600">{customer.kycStatus}</p>
                </div>
              </div>

              <div className="text-xs pt-2 border-t border-slate-200 dark:border-slate-700/50">
                <span className="text-slate-400">Current Residence Address:</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{customer.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Active Borrowings</span>
                <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{customer.activeLoans} Active Loans</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Total Borrowed</span>
                <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(customer.totalBorrowed)}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Customer Since</span>
                <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{customer.createdAt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Documents */}
        {subTab === "documents" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Customer KYC & Financial Vault
              </h4>
              <Button size="sm" variant="outline">+ Upload Document</Button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {customerDocs.map((doc, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{doc.name}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Category: <span className="font-semibold text-slate-500">{doc.type}</span> • Reference: {doc.docNo}
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px]">{doc.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {subTab === "timeline" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Customer Lifecycle Journey
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900">
              {customerTimeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900" />
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h5>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loans */}
        {subTab === "loans" && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              All Loan Accounts & Applications
            </h4>

            <div className="space-y-3">
              {loanHistory.map((lh, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{lh.product}</span>
                      <span className="font-mono text-blue-600 ml-2">({lh.appNo})</span>
                    </div>
                    <Badge variant={lh.status === "Closed" ? "neutral" : "success"} className="text-[10px]">
                      {lh.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-slate-500">
                    <div>Amount: <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(lh.amount)}</span></div>
                    <div>Tenure: <span className="font-semibold text-slate-800 dark:text-slate-200">{lh.tenure}</span></div>
                    <div>ROI: <span className="font-semibold text-slate-800 dark:text-slate-200">{lh.roi}</span></div>
                    <div>EMI: <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(lh.emi)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CRM */}
        {subTab === "crm" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                CRM Follow-up Notes & Interactions
              </h4>
              <Button size="sm" variant="outline">+ Add Follow-up Note</Button>
            </div>

            <div className="space-y-2">
              {crmFollowups.map((crm, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{crm.type} • {crm.outcome}</span>
                    <span className="text-[10px] text-slate-400">{crm.date}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">{crm.notes}</p>
                  <span className="text-[10px] text-slate-400 font-semibold">Logged by: {crm.agent}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
