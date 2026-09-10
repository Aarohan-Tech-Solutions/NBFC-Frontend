import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { Badge, Button } from "@nbfc/ui";
import { Role } from "@nbfc/shared-types";

interface PermissionRow {
  moduleId: string;
  moduleName: string;
  category: string;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
    export: boolean;
  };
}

type RolePermissionsMap = Record<Role, PermissionRow[]>;

const baseModules = [
  { moduleId: "dashboard", moduleName: "Super Admin Dashboard", category: "Core" },
  { moduleId: "users", moduleName: "User Management & Logs", category: "Access" },
  { moduleId: "roles", moduleName: "Roles & Permissions", category: "Access" },
  { moduleId: "company", moduleName: "Company Settings & Vault", category: "Organization" },
  { moduleId: "areas", moduleName: "Area Management", category: "Organization" },
  { moduleId: "branches", moduleName: "Branch Operations", category: "Organization" },
  { moduleId: "dsa", moduleName: "DSA Partners & KYC", category: "Partners" },
  { moduleId: "connectors", moduleName: "Connectors & Referrals", category: "Partners" },
  { moduleId: "customers", moduleName: "Customer 360 & Timeline", category: "Customers" },
  { moduleId: "loans", moduleName: "Loan Lifecycle & Sanctioning", category: "Lending" },
  { moduleId: "documents", moduleName: "Document Vault & OCR", category: "Operations" },
  { moduleId: "verification", moduleName: "Verification Queue", category: "Operations" },
  { moduleId: "leads", moduleName: "Lead Management & Assignment", category: "Sourcing" },
  { moduleId: "crm", moduleName: "Follow-up CRM & Call Logs", category: "Sourcing" },
  { moduleId: "commissions", moduleName: "Commission Payouts", category: "Finance" },
  { moduleId: "disbursement", moduleName: "Disbursement & RTGS", category: "Finance" },
  { moduleId: "reports", moduleName: "Reports & Analytics Engine", category: "Analytics" },
  { moduleId: "security", moduleName: "Security Audit & Logs", category: "Security" },
];

const defaultRolePermissions: RolePermissionsMap = {
  [Role.SUPER_ADMIN]: baseModules.map((m) => ({
    ...m,
    permissions: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
  })),
  [Role.COMPANY_ADMIN]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: true,
      create: m.moduleId !== "security",
      edit: m.moduleId !== "security",
      delete: ["users", "loans", "leads"].includes(m.moduleId),
      approve: true,
      export: true,
    },
  })),
  [Role.AREA_MANAGER]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: !["company", "security", "roles"].includes(m.moduleId),
      create: ["dsa", "connectors", "loans", "leads", "crm"].includes(m.moduleId),
      edit: ["dsa", "connectors", "loans", "leads", "crm"].includes(m.moduleId),
      delete: false,
      approve: ["dsa", "loans"].includes(m.moduleId),
      export: ["reports", "loans", "dsa"].includes(m.moduleId),
    },
  })),
  [Role.BRANCH_MANAGER]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: !["company", "security", "roles", "areas"].includes(m.moduleId),
      create: ["loans", "customers", "leads", "crm", "verification", "documents"].includes(m.moduleId),
      edit: ["loans", "customers", "leads", "crm", "verification", "documents"].includes(m.moduleId),
      delete: false,
      approve: ["loans", "verification", "disbursement"].includes(m.moduleId),
      export: ["loans", "customers", "reports"].includes(m.moduleId),
    },
  })),
  [Role.DSA]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: ["dashboard", "loans", "leads", "commissions", "documents"].includes(m.moduleId),
      create: ["loans", "leads", "documents"].includes(m.moduleId),
      edit: ["loans", "leads"].includes(m.moduleId),
      delete: false,
      approve: false,
      export: ["commissions", "loans"].includes(m.moduleId),
    },
  })),
  [Role.CONNECTOR]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: ["dashboard", "leads", "commissions"].includes(m.moduleId),
      create: ["leads"].includes(m.moduleId),
      edit: ["leads"].includes(m.moduleId),
      delete: false,
      approve: false,
      export: ["commissions"].includes(m.moduleId),
    },
  })),
  [Role.STAFF]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: ["dashboard", "loans", "customers", "leads", "crm", "documents", "verification"].includes(m.moduleId),
      create: ["loans", "customers", "leads", "crm", "documents"].includes(m.moduleId),
      edit: ["loans", "customers", "leads", "crm", "documents", "verification"].includes(m.moduleId),
      delete: false,
      approve: false,
      export: false,
    },
  })),
  [Role.SENIOR_CREDIT_OFFICER]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: ["dashboard", "loans", "customers", "documents", "verification", "reports"].includes(m.moduleId),
      create: ["loans", "verification", "documents"].includes(m.moduleId),
      edit: ["loans", "verification", "documents"].includes(m.moduleId),
      delete: false,
      approve: ["loans", "verification"].includes(m.moduleId),
      export: ["loans", "reports"].includes(m.moduleId),
    },
  })),
  [Role.VERIFICATION_OFFICER]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: ["dashboard", "loans", "customers", "documents", "verification"].includes(m.moduleId),
      create: ["verification", "documents"].includes(m.moduleId),
      edit: ["verification", "documents"].includes(m.moduleId),
      delete: false,
      approve: ["verification"].includes(m.moduleId),
      export: false,
    },
  })),
  [Role.DISBURSEMENT_OFFICER]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: ["dashboard", "loans", "disbursement", "reports"].includes(m.moduleId),
      create: ["disbursement"].includes(m.moduleId),
      edit: ["disbursement"].includes(m.moduleId),
      delete: false,
      approve: ["disbursement"].includes(m.moduleId),
      export: ["disbursement", "reports"].includes(m.moduleId),
    },
  })),
  [Role.BRANCH_UNDERWRITING_HEAD]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: ["dashboard", "loans", "customers", "documents", "verification", "disbursement", "reports"].includes(m.moduleId),
      create: ["loans", "verification", "documents"].includes(m.moduleId),
      edit: ["loans", "verification", "documents"].includes(m.moduleId),
      delete: false,
      approve: true,
      export: true,
    },
  })),
  [Role.CUSTOMER]: baseModules.map((m) => ({
    ...m,
    permissions: {
      view: ["dashboard", "loans", "documents"].includes(m.moduleId),
      create: ["loans", "documents"].includes(m.moduleId),
      edit: false,
      delete: false,
      approve: false,
      export: false,
    },
  })),
};

const roleDescriptions: Record<Role, { title: string; desc: string; userCount: number; badgeVariant: "danger" | "warning" | "info" | "neutral" | "success" }> = {
  [Role.SUPER_ADMIN]: { title: "Super Admin", desc: "Supreme executive access across all branches, policy parameters, financial approvals, and security audits.", userCount: 3, badgeVariant: "danger" },
  [Role.COMPANY_ADMIN]: { title: "Company Admin", desc: "Corporate headquarters administration, organization-wide policy settings, and executive reporting.", userCount: 5, badgeVariant: "warning" },
  [Role.AREA_MANAGER]: { title: "Area Manager", desc: "Supervises multi-branch clusters within assigned regional territories, monitors DSA onboarding and quota targets.", userCount: 12, badgeVariant: "info" },
  [Role.BRANCH_MANAGER]: { title: "Branch Manager", desc: "Commercial branch operations, sales targets, DSA/Connector management, and branch team administration.", userCount: 28, badgeVariant: "info" },
  [Role.SENIOR_CREDIT_OFFICER]: { title: "Senior Credit Officer", desc: "Underwriting evaluation, credit score assessment, FOIR/LTV calculations, and appraisal note preparation.", userCount: 18, badgeVariant: "info" },
  [Role.VERIFICATION_OFFICER]: { title: "Verification Officer", desc: "Field inspections, KYC validation, property title searches, and guarantor checks.", userCount: 32, badgeVariant: "info" },
  [Role.DISBURSEMENT_OFFICER]: { title: "Disbursement Officer", desc: "Escrow account fund transfers, fee deductions, and RTGS/NEFT transaction authorization.", userCount: 14, badgeVariant: "info" },
  [Role.BRANCH_UNDERWRITING_HEAD]: { title: "Branch Underwriting Head", desc: "Branch credit delegation authority, policy exception approvals, and final loan sanctioning/rejection.", userCount: 28, badgeVariant: "warning" },
  [Role.DSA]: { title: "DSA Partner", desc: "Direct Selling Agent portal access for application sourcing, document upload, status tracking, and commission payouts.", userCount: 142, badgeVariant: "neutral" },
  [Role.CONNECTOR]: { title: "Connector", desc: "Freelance referral partners submitting prospective customer leads with automated referral tracking.", userCount: 86, badgeVariant: "neutral" },
  [Role.STAFF]: { title: "Operations Staff", desc: "Front-desk and back-office credit operations, document validation, CRM tele-calling, and verification coordination.", userCount: 64, badgeVariant: "success" },
  [Role.CUSTOMER]: { title: "Customer Portal", desc: "Borrower self-service portal for loan tracking, EMI schedule, document uploads, and NOC downloads.", userCount: 1840, badgeVariant: "neutral" },
};


export const RolesPermissionsFeature: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.SUPER_ADMIN);
  const [rolePermissions, setRolePermissions] = useState<RolePermissionsMap>(defaultRolePermissions);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentRoleMatrix = rolePermissions[selectedRole];

  const handleToggle = (
    moduleId: string,
    permissionKey: keyof PermissionRow["permissions"]
  ) => {
    if (selectedRole === Role.SUPER_ADMIN) {
      // Super Admin permissions are permanent
      return;
    }
    setRolePermissions((prev) => {
      const updatedList = prev[selectedRole].map((row) => {
        if (row.moduleId === moduleId) {
          return {
            ...row,
            permissions: {
              ...row.permissions,
              [permissionKey]: !row.permissions[permissionKey],
            },
          };
        }
        return row;
      });
      return { ...prev, [selectedRole]: updatedList };
    });
    setSavedSuccess(false);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setRolePermissions((prev) => ({
      ...prev,
      [selectedRole]: defaultRolePermissions[selectedRole],
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions Management"
        description="Configure granular access control, functional capabilities, and approval authorities across 7 organizational roles."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset to Defaults
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Permissions
            </Button>
          </div>
        }
      />

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between animate-fade-in">
          <span>Permissions matrix for role "{roleDescriptions[selectedRole].title}" updated and synced successfully.</span>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-600 font-bold">&times;</button>
        </div>
      )}

      {/* Role Selection Tabs / Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {(Object.keys(roleDescriptions) as Role[]).filter((r) => r !== Role.CUSTOMER).map((roleKey) => {
          const info = roleDescriptions[roleKey];
          const isSelected = selectedRole === roleKey;

          return (
            <button
              key={roleKey}
              onClick={() => {
                setSelectedRole(roleKey);
                setSavedSuccess(false);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]"
                  : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {info.userCount} Users
                </span>
              </div>
              <div className="font-bold text-sm mt-2 truncate">{info.title}</div>
            </button>
          );
        })}
      </div>

      {/* Role Details Banner */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {roleDescriptions[selectedRole].title} Permissions Matrix
            </h3>
            <Badge variant={roleDescriptions[selectedRole].badgeVariant} className="text-xs">
              {roleDescriptions[selectedRole].userCount} Active Assignees
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            {roleDescriptions[selectedRole].desc}
          </p>
        </div>

        {selectedRole === Role.SUPER_ADMIN && (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200">
            System Locked (Full Rights)
          </span>
        )}
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">System Module</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">View</th>
                <th className="py-3.5 px-4 text-center">Create</th>
                <th className="py-3.5 px-4 text-center">Edit</th>
                <th className="py-3.5 px-4 text-center">Delete</th>
                <th className="py-3.5 px-4 text-center">Approve / Sanction</th>
                <th className="py-3.5 px-4 text-center">Export Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentRoleMatrix.map((row) => (
                <tr key={row.moduleId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                    {row.moduleName}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      {row.category}
                    </span>
                  </td>

                  {(["view", "create", "edit", "delete", "approve", "export"] as const).map((permKey) => {
                    const isChecked = row.permissions[permKey];
                    const isLocked = selectedRole === Role.SUPER_ADMIN;

                    return (
                      <td key={permKey} className="py-3 px-4 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={isLocked}
                            onChange={() => handleToggle(row.moduleId, permKey)}
                            className={`w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all ${
                              isLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                            }`}
                          />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionsFeature;
