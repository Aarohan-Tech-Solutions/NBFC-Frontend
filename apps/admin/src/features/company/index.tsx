import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { Input, Button, Tabs, Badge } from "@nbfc/ui";

export const CompanyFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [profile, setProfile] = useState({
    companyName: "Arohon Financial Services Private Limited",
    brandName: "Arohon Capital & Loan Services",
    cin: "U65999WB2021PTC248901",
    rbiRegNo: "RBI/NBFC/ND-SI/2021/8849",
    gstin: "19AAACA1234F1Z5",
    pan: "AAACA1234F",
    website: "https://www.arohonloans.com",
    supportEmail: "contact@arohonloans.com",
    registeredOffice: "Arohon Tower, 5th Floor, Salt Lake Sector V, Kolkata, WB 700091",
    corporateOffice: "Express Towers, 12th Floor, Nariman Point, Mumbai, MH 400021",
  });

  const [settings, setSettings] = useState({
    fiscalYear: "2026-2027",
    currency: "INR (₹)",
    baseBenchmarkRate: "8.25",
    maxAutoSanctionLimit: "500000",
    maxBranchSanctionLimit: "2500000",
    defaultSlaHours: "48",
    autoKycVerification: true,
    requireGuarantorAbove: "1000000",
  });

  const [bankAccounts, setBankAccounts] = useState([
    { id: "1", bankName: "HDFC Bank Ltd.", accountName: "Arohon Financial Services Pvt Ltd - Disbursal Escrow", accountNo: "50200084920194", ifsc: "HDFC0000060", branch: "Salt Lake Sector V, Kolkata", accountType: "Escrow Current A/C", status: "Primary" },
    { id: "2", bankName: "ICICI Bank Ltd.", accountName: "Arohon Financial Services Pvt Ltd - Collection Escrow", accountNo: "000405018392", ifsc: "ICIC0000004", branch: "Nariman Point, Mumbai", accountType: "Collection Current A/C", status: "Active" },
    { id: "3", bankName: "Axis Bank Ltd.", accountName: "Arohon Financial Services - Partner Commission Account", accountNo: "918020048192847", ifsc: "UTIB0000142", branch: "Connaught Place, New Delhi", accountType: "Current A/C", status: "Active" },
  ]);

  const [companyDocs, setCompanyDocs] = useState([
    { id: "1", title: "RBI NBFC Certificate of Registration (CoR)", docNo: "N-05.08492", dateIssued: "14 Jun 2021", validTill: "Perpetual", status: "Verified" },
    { id: "2", title: "Certificate of Incorporation (MCA)", docNo: "U65999WB2021PTC248901", dateIssued: "10 Mar 2021", validTill: "Perpetual", status: "Verified" },
    { id: "3", title: "GST Registration Certificate (Form REG-06)", docNo: "19AAACA1234F1Z5", dateIssued: "01 Jul 2021", validTill: "Active", status: "Verified" },
    { id: "4", title: "Memorandum & Articles of Association (MoA & AoA)", docNo: "MOA-2021-V2", dateIssued: "10 Mar 2021", validTill: "Active", status: "Verified" },
    { id: "5", title: "Corporate PAN Card", docNo: "AAACA1234F", dateIssued: "15 Mar 2021", validTill: "Perpetual", status: "Verified" },
  ]);

  const tabs = [
    { id: "profile", label: "Company Profile" },
    { id: "settings", label: "Operational Settings & SLA" },
    { id: "documents", label: "Company Documents Vault" },
    { id: "logo", label: "Company Logo & Branding" },
    { id: "bank", label: "Bank & Escrow Accounts" },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Management"
        description="Legal identity, RBI NBFC licensing, operational loan policies, corporate documents, and escrow bank accounts."
        action={
          <Button size="sm" onClick={handleSave}>
            Save All Changes
          </Button>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between">
          <span>Company configuration parameters and profile details saved successfully.</span>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-600 font-bold">&times;</button>
        </div>
      )}

      {/* Tab: Company Profile */}
      {activeTab === "profile" && (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Statutory & Legal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Registered Corporate Name"
              value={profile.companyName}
              onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
              required
            />
            <Input
              label="Brand / Trading Name"
              value={profile.brandName}
              onChange={(e) => setProfile({ ...profile, brandName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="CIN (Corporate Identification Number)"
              value={profile.cin}
              onChange={(e) => setProfile({ ...profile, cin: e.target.value })}
              required
            />
            <Input
              label="RBI Registration No. (NBFC)"
              value={profile.rbiRegNo}
              onChange={(e) => setProfile({ ...profile, rbiRegNo: e.target.value })}
              required
            />
            <Input
              label="GSTIN"
              value={profile.gstin}
              onChange={(e) => setProfile({ ...profile, gstin: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Corporate PAN"
              value={profile.pan}
              onChange={(e) => setProfile({ ...profile, pan: e.target.value })}
              required
            />
            <Input
              label="Official Website"
              value={profile.website}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
            />
            <Input
              label="Official Support Email"
              value={profile.supportEmail}
              onChange={(e) => setProfile({ ...profile, supportEmail: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Registered Office Address
              </label>
              <textarea
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
                value={profile.registeredOffice}
                onChange={(e) => setProfile({ ...profile, registeredOffice: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Corporate Headquarters Address
              </label>
              <textarea
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
                value={profile.corporateOffice}
                onChange={(e) => setProfile({ ...profile, corporateOffice: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button type="submit">Update Legal Profile</Button>
          </div>
        </form>
      )}

      {/* Tab: Operational Settings & SLA */}
      {activeTab === "settings" && (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Lending Rules, Limits & SLA Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="Active Fiscal Year"
              value={settings.fiscalYear}
              onChange={(e) => setSettings({ ...settings, fiscalYear: e.target.value })}
            />
            <Input
              label="Benchmark Base Rate (% p.a.)"
              value={settings.baseBenchmarkRate}
              onChange={(e) => setSettings({ ...settings, baseBenchmarkRate: e.target.value })}
            />
            <Input
              label="Standard Processing SLA (Hours)"
              value={settings.defaultSlaHours}
              onChange={(e) => setSettings({ ...settings, defaultSlaHours: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="Auto-Approval Threshold Limit (₹)"
              value={settings.maxAutoSanctionLimit}
              onChange={(e) => setSettings({ ...settings, maxAutoSanctionLimit: e.target.value })}
            />
            <Input
              label="Branch Manager Approval Limit (₹)"
              value={settings.maxBranchSanctionLimit}
              onChange={(e) => setSettings({ ...settings, maxBranchSanctionLimit: e.target.value })}
            />
            <Input
              label="Guarantor Required Above (₹)"
              value={settings.requireGuarantorAbove}
              onChange={(e) => setSettings({ ...settings, requireGuarantorAbove: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button type="submit">Save Lending Settings</Button>
          </div>
        </form>
      )}

      {/* Tab: Company Documents Vault */}
      {activeTab === "documents" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Corporate Regulatory Documents
              </h3>
              <p className="text-xs text-slate-500">RBI, MCA, and Tax certifications on record</p>
            </div>
            <Button size="sm">+ Upload Legal Document</Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {companyDocs.map((doc) => (
              <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-2 rounded-xl transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{doc.title}</h4>
                    <Badge variant="success" className="text-[10px]">{doc.status}</Badge>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Doc No: <span className="font-mono font-semibold">{doc.docNo}</span> • Issued: {doc.dateIssued} • Validity: {doc.validTill}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs">Preview</Button>
                  <Button size="sm" variant="ghost" className="text-xs text-blue-600">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Company Logo & Branding */}
      {activeTab === "logo" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-2xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Company Logo & Visual Brand Assets
          </h3>

          <div className="flex items-center gap-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="w-24 h-24 rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-white p-3 shadow-md">
              <span className="font-black text-xl tracking-wider text-blue-400">NBFC</span>
              <span className="text-[9px] font-bold text-slate-300">AROHON</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Primary Header Logo</h4>
              <p className="text-xs text-slate-500">Recommended size: 512x512px. Formats: PNG, SVG with transparent background.</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Upload New Logo</Button>
                <Button size="sm" variant="ghost">Remove</Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Brand Accent Palette
            </h4>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="w-6 h-6 rounded-md bg-blue-600"></div>
                <span className="text-xs font-mono">#2563EB (Primary)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="w-6 h-6 rounded-md bg-emerald-600"></div>
                <span className="text-xs font-mono">#059669 (Success)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Bank Details */}
      {activeTab === "bank" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Corporate Bank & Escrow Accounts
              </h3>
              <p className="text-xs text-slate-500">Designated accounts for loan disbursements, customer collections, and commission payouts</p>
            </div>
            <Button size="sm">+ Add Bank Account</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bankAccounts.map((acc) => (
              <div key={acc.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{acc.bankName}</span>
                  <Badge variant={acc.status === "Primary" ? "success" : "info"} className="text-[10px]">
                    {acc.status}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-slate-500">{acc.accountName}</div>
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {acc.accountNo}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    IFSC: <span className="font-mono font-semibold">{acc.ifsc}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Branch: {acc.branch}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">{acc.accountType}</span>
                  <button className="text-blue-600 hover:underline font-semibold text-[11px]">Edit Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyFeature;
