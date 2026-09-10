import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Button, Badge, Modal, Input, Select } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";
import { DSADetailDrawer, DSAItem } from "./components/DSADetailDrawer";

const initialDSAs: DSAItem[] = [
  { id: "1", code: "DSA-1042", agencyName: "Apex Financial Solutions", contactPerson: "Vikas Sharma", email: "vikas@apexloans.in", phone: "+91 98455 67890", area: "Karnataka Central", branch: "Bengaluru Koramangala", tier: "Platinum", kycStatus: "Verified", activeLoans: 45, totalDisbursed: 18400000, commissionRate: 1.5, portalAccess: true, pan: "ABCPV1234D", gstin: "29ABCPV1234D1Z5", bankAccount: "502000849201", bankIfsc: "HDFC0000060" },
  { id: "2", code: "DSA-1098", agencyName: "Star Loans Consultancy", contactPerson: "Rohan Kulkarni", email: "rohan@starloans.co.in", phone: "+91 98203 11223", area: "Maharashtra South", branch: "Mumbai Nariman Point", tier: "Gold", kycStatus: "Verified", activeLoans: 32, totalDisbursed: 14200000, commissionRate: 1.25, portalAccess: true, pan: "XYZPK5678M", gstin: "27XYZPK5678M1Z8", bankAccount: "000405018392", bankIfsc: "ICIC0000004" },
  { id: "3", code: "DSA-1120", agencyName: "Eastern Capital Partners", contactPerson: "Debashis Banerjee", email: "debashis@easterncap.com", phone: "+91 98301 99887", area: "West Bengal East", branch: "Kolkata Central", tier: "Platinum", kycStatus: "Verified", activeLoans: 54, totalDisbursed: 24800000, commissionRate: 1.5, portalAccess: true, pan: "AABCE9876P", gstin: "19AABCE9876P1Z2", bankAccount: "918020048192", bankIfsc: "UTIB0000142" },
  { id: "4", code: "DSA-1145", agencyName: "Capital Tree Advisory", contactPerson: "Manish Gupta", email: "manish@capitaltree.in", phone: "+91 98114 77665", area: "Delhi NCR North", branch: "Delhi Connaught Place", tier: "Silver", kycStatus: "Pending", activeLoans: 14, totalDisbursed: 5600000, commissionRate: 1.0, portalAccess: false, pan: "MNBVC4321Q", gstin: "07MNBVC4321Q1Z4", bankAccount: "112233445566", bankIfsc: "SBIN0000691" },
  { id: "5", code: "DSA-1178", agencyName: "Deccan Financial Associates", contactPerson: "Kalyan Rao", email: "kalyan@deccanfin.com", phone: "+91 98490 33445", area: "Telangana West", branch: "Hyderabad Hitech City", tier: "Gold", kycStatus: "Verified", activeLoans: 28, totalDisbursed: 11500000, commissionRate: 1.25, portalAccess: true, pan: "LKJHG8765R", gstin: "36LKJHG8765R1Z9", bankAccount: "889900112233", bankIfsc: "KKBK0000123" },
];

export const DSAFeature: React.FC = () => {
  const [dsas, setDsas] = useState<DSAItem[]>(initialDSAs);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [kycFilter, setKycFilter] = useState("all");

  // Modal and Drawer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDSA, setEditingDSA] = useState<DSAItem | null>(null);
  const [selectedDSAForDrawer, setSelectedDSAForDrawer] = useState<DSAItem | null>(null);

  const [formData, setFormData] = useState({
    agencyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    branch: "Kolkata Central",
    area: "West Bengal East",
    tier: "Gold" as DSAItem["tier"],
    commissionRate: 1.25,
    pan: "",
    gstin: "",
    bankAccount: "",
    bankIfsc: "",
    aadhaar: "",
    selfieUploaded: true,
  });

  const handleOpenModal = (dsa?: DSAItem) => {
    if (dsa) {
      setEditingDSA(dsa);
      setFormData({
        agencyName: dsa.agencyName,
        contactPerson: dsa.contactPerson,
        email: dsa.email,
        phone: dsa.phone,
        branch: dsa.branch,
        area: dsa.area,
        tier: dsa.tier,
        commissionRate: dsa.commissionRate,
        pan: dsa.pan,
        gstin: dsa.gstin,
        bankAccount: dsa.bankAccount,
        bankIfsc: dsa.bankIfsc,
        aadhaar: "XXXX-XXXX-8921",
        selfieUploaded: true,
      });
    } else {
      setEditingDSA(null);
      setFormData({
        agencyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        branch: "Kolkata Central",
        area: "West Bengal East",
        tier: "Gold",
        commissionRate: 1.25,
        pan: "",
        gstin: "",
        bankAccount: "",
        bankIfsc: "",
        aadhaar: "",
        selfieUploaded: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDSA) {
      setDsas((prev) =>
        prev.map((d) => (d.id === editingDSA.id ? { ...d, ...formData } : d))
      );
    } else {
      const generatedDsaNum = Math.floor(1100 + Math.random() * 800);
      const newDSA: DSAItem = {
        id: String(Date.now()),
        code: `DSA-${generatedDsaNum}`,
        ...formData,
        kycStatus: "Pending",
        activeLoans: 0,
        totalDisbursed: 0,
        portalAccess: true,
      };
      setDsas((prev) => [newDSA, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (id: string, updates: Partial<DSAItem>) => {
    setDsas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
    if (selectedDSAForDrawer && selectedDSAForDrawer.id === id) {
      setSelectedDSAForDrawer((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = dsas.map((d) => ({
      "DSA Code": d.code,
      "Agency Name": d.agencyName,
      "Contact Person": d.contactPerson,
      Email: d.email,
      Phone: d.phone,
      Branch: d.branch,
      Area: d.area,
      Tier: d.tier,
      "KYC Status": d.kycStatus,
      "Active Files": d.activeLoans,
      "Disbursed Volume": d.totalDisbursed,
      "Commission Rate %": d.commissionRate,
      "Portal Access": d.portalAccess ? "Enabled" : "Suspended",
    }));

    if (format === "excel") {
      exportToExcel("DSA_Partners_Directory", "DSAs", exportData);
    } else {
      exportToCSV("DSA_Partners_Directory", exportData);
    }
  };

  const filtered = dsas.filter((d) => {
    const matchesSearch =
      d.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.branch.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = tierFilter === "all" || d.tier === tierFilter;
    const matchesKyc = kycFilter === "all" || d.kycStatus === kycFilter;

    return matchesSearch && matchesTier && matchesKyc;
  });

  const columns = [
    {
      header: "DSA Code & Agency",
      accessorKey: (row: DSAItem) => (
        <div
          className="cursor-pointer group"
          onClick={() => setSelectedDSAForDrawer(row)}
        >
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.agencyName}
          </div>
          <div className="text-[11px] text-slate-400">
            Code: <span className="font-mono font-semibold text-blue-600">{row.code}</span> • {row.contactPerson}
          </div>
        </div>
      ),
    },
    {
      header: "Branch & Area",
      accessorKey: (row: DSAItem) => (
        <div>
          <div className="font-medium text-slate-800 dark:text-slate-200">{row.branch}</div>
          <div className="text-[11px] text-slate-400">{row.area}</div>
        </div>
      ),
    },
    {
      header: "Tier",
      accessorKey: (row: DSAItem) => (
        <Badge
          variant={row.tier === "Platinum" ? "danger" : row.tier === "Gold" ? "warning" : "info"}
          className="text-[10px]"
        >
          {row.tier}
        </Badge>
      ),
    },
    {
      header: "KYC Status",
      accessorKey: (row: DSAItem) => (
        <Badge
          variant={
            row.kycStatus === "Verified" ? "success" : row.kycStatus === "Pending" ? "warning" : "danger"
          }
          className="text-[10px]"
        >
          {row.kycStatus}
        </Badge>
      ),
    },
    {
      header: "Sourced Volume",
      accessorKey: (row: DSAItem) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(row.totalDisbursed)}
          </div>
          <div className="text-[11px] text-slate-400">{row.activeLoans} active files</div>
        </div>
      ),
    },
    {
      header: "Commission",
      accessorKey: (row: DSAItem) => (
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {row.commissionRate}%
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: DSAItem) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-blue-600"
            onClick={() => setSelectedDSAForDrawer(row)}
          >
            Profile & KYC
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleOpenModal(row)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="DSA Partner Management"
        description="Onboard direct selling agents, verify KYC documents (PAN, Aadhaar, Bank, Selfie), manage partner tiering, and generate Connector Codes."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Excel
            </Button>
            <Button size="sm" onClick={() => handleOpenModal()}>
              + Onboard New DSA
            </Button>
          </div>
        }
      />

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <Select
          label="Filter by Tier"
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          options={[
            { label: "All Tiers", value: "all" },
            { label: "Platinum Tier (1.5%)", value: "Platinum" },
            { label: "Gold Tier (1.25%)", value: "Gold" },
            { label: "Silver Tier (1.0%)", value: "Silver" },
          ]}
        />
        <Select
          label="Filter by KYC Status"
          value={kycFilter}
          onChange={(e) => setKycFilter(e.target.value)}
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Verified", value: "Verified" },
            { label: "Pending Verification", value: "Pending" },
            { label: "Rejected", value: "Rejected" },
          ]}
        />
        <div className="flex items-end">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-slate-500"
            onClick={() => {
              setTierFilter("all");
              setKycFilter("all");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Onboard / Edit DSA Modal with KYC Chain */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDSA ? "Edit DSA Partner Profile" : "DSA Partner Onboarding & KYC Chain"}
        className="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200">
            <span className="font-bold">Onboarding Process:</span> Mail ID, Phone, PAN, Name &rarr; Bank A/C & IFSC &rarr; Aadhaar &rarr; PAN Card &rarr; Selfie / Photo (Auto-generates Connector Code on approval).
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Agency / Legal Entity Name"
              placeholder="e.g. Apex Financial Solutions"
              value={formData.agencyName}
              onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
              required
            />
            <Input
              label="Authorized Contact Person Name"
              placeholder="e.g. Vikas Sharma"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Official Mail ID"
              type="email"
              placeholder="contact@agency.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Contact Phone / Mobile"
              placeholder="+91 98455 67890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Assigned Regional Area"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              options={[
                { label: "West Bengal East", value: "West Bengal East" },
                { label: "Maharashtra South", value: "Maharashtra South" },
                { label: "Delhi NCR North", value: "Delhi NCR North" },
                { label: "Karnataka Central", value: "Karnataka Central" },
                { label: "Telangana West", value: "Telangana West" },
                { label: "Gujarat North", value: "Gujarat North" },
              ]}
            />
            <Select
              label="Assigned Branch"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              options={[
                { label: "Kolkata Central", value: "Kolkata Central" },
                { label: "Mumbai Nariman Point", value: "Mumbai Nariman Point" },
                { label: "Delhi Connaught Place", value: "Delhi Connaught Place" },
                { label: "Bengaluru Koramangala", value: "Bengaluru Koramangala" },
                { label: "Hyderabad Hitech City", value: "Hyderabad Hitech City" },
              ]}
            />
            <Select
              label="Partner Tier"
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value as DSAItem["tier"] })}
              options={[
                { label: "Platinum (1.5%)", value: "Platinum" },
                { label: "Gold (1.25%)", value: "Gold" },
                { label: "Silver (1.0%)", value: "Silver" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Agency / Owner PAN"
              placeholder="e.g. ABCPV1234D"
              value={formData.pan}
              onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
              required
            />
            <Input
              label="Owner Aadhaar Number"
              placeholder="e.g. 1234-5678-8921"
              value={formData.aadhaar}
              onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Payout Bank Account No."
              placeholder="e.g. 502000849201"
              value={formData.bankAccount}
              onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
              required
            />
            <Input
              label="Bank IFSC Code"
              placeholder="e.g. HDFC0000060"
              value={formData.bankIfsc}
              onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value.toUpperCase() })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="GSTIN Number (Optional)"
              placeholder="e.g. 29ABCPV1234D1Z5"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
            />
            <Input
              label="Commission Rate (%)"
              type="number"
              step="0.05"
              value={String(formData.commissionRate)}
              onChange={(e) => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
              required
            />
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Owner Live Selfie / Photo</span>
              <p className="text-slate-400 text-[11px]">Geo-tagged webcam photo / document attachment</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.selfieUploaded}
                onChange={(e) => setFormData({ ...formData, selfieUploaded: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {formData.selfieUploaded ? "Photo Verified" : "Capture / Upload Photo"}
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingDSA ? "Update DSA Partner" : "Complete DSA Onboarding"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* DSA Detail Drawer */}
      <DSADetailDrawer
        isOpen={!!selectedDSAForDrawer}
        onClose={() => setSelectedDSAForDrawer(null)}
        dsa={selectedDSAForDrawer}
        onEdit={() => {
          setEditingDSA(selectedDSAForDrawer);
          setSelectedDSAForDrawer(null);
          setIsModalOpen(true);
        }}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default DSAFeature;
