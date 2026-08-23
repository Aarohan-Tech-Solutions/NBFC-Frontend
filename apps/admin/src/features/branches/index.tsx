import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Button, Badge, Modal, Input, Select } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";
import { BranchDetailDrawer, BranchItem } from "./components/BranchDetailDrawer";

const initialBranches: BranchItem[] = [
  { id: "1", code: "BR-KOL-01", name: "Kolkata Central", area: "West Bengal East", manager: "Subhashis Roy", managerEmail: "subhashis@nbfc.com", phone: "+91 98302 34567", address: "Arohon House, 12 Park Street, Kolkata, WB 700016", activeLoans: 145, totalDisbursed: 34500000, target: 30000000, staffCount: 12, dsaCount: 42, status: "Active" },
  { id: "2", code: "BR-MUM-01", name: "Mumbai Nariman Point", area: "Maharashtra South", manager: "Priya Deshmukh", managerEmail: "priya.d@nbfc.com", phone: "+91 98203 45678", address: "Express Towers, 14th Floor, Nariman Point, Mumbai, MH 400021", activeLoans: 128, totalDisbursed: 31200000, target: 28000000, staffCount: 15, dsaCount: 38, status: "Active" },
  { id: "3", code: "BR-DEL-01", name: "Delhi Connaught Place", area: "Delhi NCR North", manager: "Rakesh Verma", managerEmail: "rakesh.v@nbfc.com", phone: "+91 98114 56789", address: "Statesman House, Barakhamba Road, Connaught Place, New Delhi 110001", activeLoans: 110, totalDisbursed: 27800000, target: 26000000, staffCount: 10, dsaCount: 35, status: "Active" },
  { id: "4", code: "BR-BLR-01", name: "Bengaluru Koramangala", area: "Karnataka Central", manager: "Anand Murthy", managerEmail: "anand.m@nbfc.com", phone: "+91 98451 33445", address: "7th Block, 80 Feet Road, Koramangala, Bengaluru, KA 560095", activeLoans: 95, totalDisbursed: 24500000, target: 25000000, staffCount: 9, dsaCount: 29, status: "Active" },
  { id: "5", code: "BR-HYD-01", name: "Hyderabad Hitech City", area: "Telangana West", manager: "Suresh Reddy", managerEmail: "suresh.r@nbfc.com", phone: "+91 98490 55667", address: "Cyber Towers, 4th Floor, Hitech City, Madhapur, Hyderabad, TS 500081", activeLoans: 82, totalDisbursed: 19800000, target: 22000000, staffCount: 8, dsaCount: 24, status: "Active" },
  { id: "6", code: "BR-AHM-01", name: "Ahmedabad SG Highway", area: "Gujarat North", manager: "Hitesh Patel", managerEmail: "hitesh.p@nbfc.com", phone: "+91 98250 77889", address: "Titanium Square, SG Highway, Thaltej, Ahmedabad, GJ 380054", activeLoans: 74, totalDisbursed: 18200000, target: 20000000, staffCount: 7, dsaCount: 22, status: "Active" },
];

export const BranchesFeature: React.FC = () => {
  const [branches, setBranches] = useState<BranchItem[]>(initialBranches);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAreaFilter, setSelectedAreaFilter] = useState("all");

  // Modal and Drawer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchItem | null>(null);
  const [selectedBranchForDrawer, setSelectedBranchForDrawer] = useState<BranchItem | null>(null);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    area: "West Bengal East",
    manager: "Subhashis Roy",
    managerEmail: "",
    phone: "",
    address: "",
    target: 25000000,
    status: "Active" as "Active" | "Inactive",
  });

  const handleOpenModal = (branch?: BranchItem) => {
    if (branch) {
      setEditingBranch(branch);
      setFormData({
        code: branch.code,
        name: branch.name,
        area: branch.area,
        manager: branch.manager,
        managerEmail: branch.managerEmail,
        phone: branch.phone,
        address: branch.address,
        target: branch.target,
        status: branch.status,
      });
    } else {
      setEditingBranch(null);
      setFormData({
        code: `BR-${Math.floor(100 + Math.random() * 900)}`,
        name: "",
        area: "West Bengal East",
        manager: "Subhashis Roy",
        managerEmail: "",
        phone: "",
        address: "",
        target: 25000000,
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBranch) {
      setBranches((prev) =>
        prev.map((b) => (b.id === editingBranch.id ? { ...b, ...formData } : b))
      );
    } else {
      const newBranch: BranchItem = {
        id: String(Date.now()),
        code: formData.code,
        name: formData.name,
        area: formData.area,
        manager: formData.manager,
        managerEmail: formData.managerEmail || "manager@nbfc.com",
        phone: formData.phone || "+91 98765 43210",
        address: formData.address,
        activeLoans: 0,
        totalDisbursed: 0,
        target: Number(formData.target),
        staffCount: 4,
        dsaCount: 2,
        status: formData.status,
      };
      setBranches((prev) => [newBranch, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = branches.map((b) => ({
      "Branch Code": b.code,
      "Branch Name": b.name,
      Area: b.area,
      Manager: b.manager,
      Phone: b.phone,
      "Active Loans": b.activeLoans,
      "Disbursed (YTD)": b.totalDisbursed,
      "Monthly Target": b.target,
      Staff: b.staffCount,
      "Attached DSAs": b.dsaCount,
      Status: b.status,
    }));

    if (format === "excel") {
      exportToExcel("Branches_Directory", "Branches", exportData);
    } else {
      exportToCSV("Branches_Directory", exportData);
    }
  };

  const filtered = branches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesArea = selectedAreaFilter === "all" || b.area === selectedAreaFilter;

    return matchesSearch && matchesArea;
  });

  const columns = [
    {
      header: "Branch & Code",
      accessorKey: (row: BranchItem) => (
        <div
          className="cursor-pointer group"
          onClick={() => setSelectedBranchForDrawer(row)}
        >
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.name}
          </div>
          <div className="text-[11px] text-slate-400">
            Code: <span className="font-mono font-semibold">{row.code}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Area Region",
      accessorKey: "area" as const,
    },
    {
      header: "Branch Manager",
      accessorKey: (row: BranchItem) => (
        <div>
          <div className="font-medium text-slate-800 dark:text-slate-200">{row.manager}</div>
          <div className="text-[11px] text-slate-400">{row.phone}</div>
        </div>
      ),
    },
    {
      header: "Disbursed / Target",
      accessorKey: (row: BranchItem) => {
        const pct = Math.round((row.totalDisbursed / row.target) * 100);
        return (
          <div className="w-36">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {formatCurrency(row.totalDisbursed)}
              </span>
              <span className={pct >= 100 ? "text-emerald-600 font-bold" : "text-slate-500"}>
                {pct}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${pct >= 100 ? "bg-emerald-500" : "bg-blue-600"}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: "Team & DSAs",
      accessorKey: (row: BranchItem) => (
        <div className="text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{row.staffCount}</span> Staff •{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-100">{row.dsaCount}</span> DSAs
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: (row: BranchItem) => (
        <Badge variant={row.status === "Active" ? "success" : "neutral"}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: BranchItem) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-blue-600"
            onClick={() => setSelectedBranchForDrawer(row)}
          >
            Details
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
        title="Branch Management"
        description="Directory of operating branches, facility documents, staff rosters, and monthly disbursement performance."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Excel
            </Button>
            <Button size="sm" onClick={() => handleOpenModal()}>
              + Add New Branch
            </Button>
          </div>
        }
      />

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-full sm:w-64">
          <Select
            label="Filter by Regional Area"
            value={selectedAreaFilter}
            onChange={(e) => setSelectedAreaFilter(e.target.value)}
            options={[
              { label: "All Areas", value: "all" },
              { label: "West Bengal East", value: "West Bengal East" },
              { label: "Maharashtra South", value: "Maharashtra South" },
              { label: "Delhi NCR North", value: "Delhi NCR North" },
              { label: "Karnataka Central", value: "Karnataka Central" },
              { label: "Telangana West", value: "Telangana West" },
              { label: "Gujarat North", value: "Gujarat North" },
            ]}
          />
        </div>

        <span className="text-xs text-slate-500">
          Showing {filtered.length} of {branches.length} branches
        </span>
      </div>

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Add / Edit Branch Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBranch ? "Edit Branch Details" : "Add New Branch Office"}
        className="max-w-xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Branch Name"
              placeholder="e.g. Kolkata Central"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Branch Code"
              placeholder="e.g. BR-KOL-01"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <Input
              label="Branch Manager Name"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Official Contact Phone"
              placeholder="+91 98302 34567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              label="Monthly Disbursement Target (₹)"
              type="number"
              value={String(formData.target)}
              onChange={(e) => setFormData({ ...formData, target: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Branch Office Address
            </label>
            <textarea
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingBranch ? "Update Branch" : "Create Branch"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Branch Detail Drawer */}
      <BranchDetailDrawer
        isOpen={!!selectedBranchForDrawer}
        onClose={() => setSelectedBranchForDrawer(null)}
        branch={selectedBranchForDrawer}
        onEdit={() => {
          setEditingBranch(selectedBranchForDrawer);
          setSelectedBranchForDrawer(null);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
};

export default BranchesFeature;
