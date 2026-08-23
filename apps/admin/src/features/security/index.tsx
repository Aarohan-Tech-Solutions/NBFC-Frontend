import React from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge } from "@nbfc/ui";

export const SecurityFeature: React.FC = () => {
  const dummyLogs = [
    { id: "1", user: "Amit Roy (Super Admin)", action: "Approved DSA Onboarding #DSA-1042", ip: "49.37.102.14", timestamp: "16 Aug 2026 11:20:00" },
    { id: "2", user: "Rohan Sharma (Branch Manager)", action: "Exported Disbursement Report", ip: "103.22.45.11", timestamp: "16 Aug 2026 10:45:12" },
  ];

  const columns = [
    { header: "User / Role", accessorKey: "user" as const },
    { header: "Action Performed", accessorKey: "action" as const },
    { header: "IP Address", accessorKey: (row: typeof dummyLogs[0]) => <Badge variant="neutral">{row.ip}</Badge> },
    { header: "Timestamp", accessorKey: "timestamp" as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & Audit Trail"
        description="Immutable system login history, role escalation logs, and activity audit trails."
      />
      <DataTableWrapper data={dummyLogs} columns={columns} />
    </div>
  );
};

export default SecurityFeature;
