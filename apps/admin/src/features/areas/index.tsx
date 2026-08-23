import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Button, Badge, Modal, Input, Select, Tabs } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";

interface AreaItem {
  id: string;
  name: string;
  code: string;
  state: string;
  areaManager: string;
  managerEmail: string;
  managerPhone: string;
  branchesCount: number;
  activeDSAs: number;
  target: number;
  disbursed: number;
  status: "Active" | "Inactive";
}

const initialAreas: AreaItem[] = [
  { id: "1", name: "West Bengal East", code: "WB-E", state: "West Bengal", areaManager: "Subir Chatterjee", managerEmail: "subir.c@nbfc.com", managerPhone: "+91 98301 11223", branchesCount: 8, activeDSAs: 42, target: 45000000, disbursed: 48500000, status: "Active" },
  { id: "2", name: "Maharashtra South", code: "MH-S", state: "Maharashtra", areaManager: "Priya Deshmukh", managerEmail: "priya.d@nbfc.com", managerPhone: "+91 98203 45678", branchesCount: 12, activeDSAs: 58, target: 60000000, disbursed: 64200000, status: "Active" },
  { id: "3", name: "Delhi NCR North", code: "DL-NCR", state: "Delhi NCR", areaManager: "Vikram Malhotra", managerEmail: "vikram.m@nbfc.com", managerPhone: "+91 98114 99887", branchesCount: 9, activeDSAs: 44, target: 50000000, disbursed: 47800000, status: "Active" },
  { id: "4", name: "Karnataka Central", code: "KA-C", state: "Karnataka", areaManager: "Anand Murthy", managerEmail: "anand.m@nbfc.com", managerPhone: "+91 98451 33445", branchesCount: 7, activeDSAs: 38, target: 40000000, disbursed: 39500000, status: "Active" },
  { id: "5", name: "Telangana West", code: "TS-W", state: "Telangana", areaManager: "Suresh Reddy", managerEmail: "suresh.r@nbfc.com", managerPhone: "+91 98490 55667", branchesCount: 6, activeDSAs: 30, target: 35000000, disbursed: 31200000, status: "Active" },
  { id: "6", name: "Gujarat North", code: "GJ-N", state: "Gujarat", areaManager: "Hitesh Patel", managerEmail: "hitesh.p@nbfc.com", managerPhone: "+91 98250 77889", branchesCount: 5, activeDSAs: 26, target: 30000000, disbursed: 28400000, status: "Active" },
];

export const AreasFeature: React.FC = () => {
  const [areas, setAreas] = useState<AreaItem[]>(initialAreas);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all-areas");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<AreaItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    state: "West Bengal",
    areaManager: "Subir Chatterjee",
    managerEmail: "",
    managerPhone: "",
    target: 30000000,
    status: "Active" as "Active" | "Inactive",
  });

  const tabs = [
    { id: "all-areas", label: "All Regional Areas" },
    { id: "performance", label: "Area Performance & Targets" },
  ];

  const handleOpenModal = (area?: AreaItem) => {
    if (area) {
      setEditingArea(area);
      setFormData({
        name: area.name,
        code: area.code,
        state: area.state,
        areaManager: area.areaManager,
        managerEmail: area.managerEmail,
        managerPhone: area.managerPhone,
        target: area.target,
        status: area.status,
      });
    } else {
      setEditingArea(null);
      setFormData({
        name: "",
        code: "",
        state: "West Bengal",
        areaManager: "Priya Deshmukh",
        managerEmail: "",
        managerPhone: "",
        target: 30000000,
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArea) {
      setAreas((prev) =>
        prev.map((a) =>
          a.id === editingArea.id
            ? { ...a, ...formData }
            : a
        )
      );
    } else {
      const newArea: AreaItem = {
        id: String(Date.now()),
        name: formData.name,
        code: formData.code || `AR-${Math.floor(10 + Math.random() * 90)}`,
        state: formData.state,
        areaManager: formData.areaManager,
        managerEmail: formData.managerEmail || "manager@nbfc.com",
        managerPhone: formData.managerPhone || "+91 98765 00000",
        branchesCount: 1,
        activeDSAs: 5,
        target: Number(formData.target),
        disbursed: 0,
        status: formData.status,
      };
      setAreas((prev) => [newArea, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = areas.map((a) => ({
      "Area Code": a.code,
      "Area Name": a.name,
      State: a.state,
      "Area Manager": a.areaManager,
      "Manager Email": a.managerEmail,
      "Manager Phone": a.managerPhone,
      "Total Branches": a.branchesCount,
      "Active DSAs": a.activeDSAs,
      "Monthly Target": a.target,
      "Disbursed Volume": a.disbursed,
      Status: a.status,
    }));

    if (format === "excel") {
      exportToExcel("Regional_Areas_Summary", "Areas", exportData);
    } else {
      exportToCSV("Regional_Areas_Summary", exportData);
    }
  };

  const filteredAreas = areas.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.areaManager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: "Area / Region",
      accessorKey: (row: AreaItem) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100">{row.name}</div>
          <div className="text-[11px] text-slate-400">
            Code: <span className="font-mono font-semibold">{row.code}</span> • {row.state}
          </div>
        </div>
      ),
    },
    {
      header: "Assigned Area Manager",
      accessorKey: (row: AreaItem) => (
        <div>
          <div className="font-medium text-slate-800 dark:text-slate-200">{row.areaManager}</div>
          <div className="text-[11px] text-slate-400">{row.managerEmail}</div>
        </div>
      ),
    },
    {
      header: "Branches",
      accessorKey: (row: AreaItem) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {row.branchesCount} Branches
        </span>
      ),
    },
    {
      header: "Active DSAs",
      accessorKey: (row: AreaItem) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {row.activeDSAs} Partners
        </span>
      ),
    },
    {
      header: "Target vs Achieved",
      accessorKey: (row: AreaItem) => {
        const pct = Math.round((row.disbursed / row.target) * 100);
        return (
          <div className="w-36">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(row.disbursed)}</span>
              <span className={pct >= 100 ? "text-emerald-600 font-bold" : "text-slate-500"}>{pct}%</span>
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
      header: "Status",
      accessorKey: (row: AreaItem) => (
        <Badge variant={row.status === "Active" ? "success" : "neutral"}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: AreaItem) => (
        <div className="flex items-center gap-1.5">
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
        title="Area Management"
        description="Configure regional zones, assign Area Managers, and track regional lending performance."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Excel
            </Button>
            <Button size="sm" onClick={() => handleOpenModal()}>
              + Add New Area
            </Button>
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "all-areas" && (
        <DataTableWrapper
          data={filteredAreas}
          columns={columns}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={() => handleExport("csv")}
        />
      )}

      {activeTab === "performance" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((a) => {
            const achievementPct = Math.round((a.disbursed / a.target) * 100);
            return (
              <div
                key={a.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{a.name}</h4>
                    <p className="text-xs text-slate-400">Manager: {a.areaManager}</p>
                  </div>
                  <Badge variant={achievementPct >= 100 ? "success" : "info"}>
                    {achievementPct}% Target
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Disbursed Volume:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(a.disbursed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly Target:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{formatCurrency(a.target)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Operating Branches:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{a.branchesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active DSAs:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{a.activeDSAs}</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${achievementPct >= 100 ? "bg-emerald-500" : "bg-blue-600"}`}
                    style={{ width: `${Math.min(achievementPct, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Area Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingArea ? "Edit Regional Area" : "Add New Regional Area"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Area / Region Name"
            placeholder="e.g. West Bengal East"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Area Code"
              placeholder="e.g. WB-E"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
            <Select
              label="State / Union Territory"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              options={[
                { label: "West Bengal", value: "West Bengal" },
                { label: "Maharashtra", value: "Maharashtra" },
                { label: "Delhi NCR", value: "Delhi NCR" },
                { label: "Karnataka", value: "Karnataka" },
                { label: "Telangana", value: "Telangana" },
                { label: "Gujarat", value: "Gujarat" },
                { label: "Tamil Nadu", value: "Tamil Nadu" },
              ]}
            />
          </div>

          <Select
            label="Assign Area Manager"
            value={formData.areaManager}
            onChange={(e) => setFormData({ ...formData, areaManager: e.target.value })}
            options={[
              { label: "Subir Chatterjee (EMP-088)", value: "Subir Chatterjee" },
              { label: "Priya Deshmukh (EMP-089)", value: "Priya Deshmukh" },
              { label: "Vikram Malhotra (EMP-090)", value: "Vikram Malhotra" },
              { label: "Anand Murthy (EMP-091)", value: "Anand Murthy" },
              { label: "Suresh Reddy (EMP-092)", value: "Suresh Reddy" },
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Manager Email"
              type="email"
              placeholder="manager@nbfc.com"
              value={formData.managerEmail}
              onChange={(e) => setFormData({ ...formData, managerEmail: e.target.value })}
            />
            <Input
              label="Manager Phone"
              placeholder="+91 98765 43210"
              value={formData.managerPhone}
              onChange={(e) => setFormData({ ...formData, managerPhone: e.target.value })}
            />
          </div>

          <Input
            label="Monthly Disbursement Target (₹)"
            type="number"
            value={String(formData.target)}
            onChange={(e) => setFormData({ ...formData, target: Number(e.target.value) })}
            required
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingArea ? "Update Area" : "Create Area"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AreasFeature;
