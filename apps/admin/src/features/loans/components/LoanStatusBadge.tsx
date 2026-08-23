import React from "react";
import { LoanStatus } from "@nbfc/shared-types";
import { Badge } from "@nbfc/ui";

export interface LoanStatusBadgeProps {
  status: LoanStatus;
}

export const LoanStatusBadge: React.FC<LoanStatusBadgeProps> = ({ status }) => {
  const map: Record<LoanStatus, { variant: "success" | "warning" | "error" | "info" | "neutral"; label: string }> = {
    [LoanStatus.DRAFT]: { variant: "neutral", label: "Draft" },
    [LoanStatus.SUBMITTED]: { variant: "info", label: "Submitted" },
    [LoanStatus.PENDING_VERIFICATION]: { variant: "warning", label: "Pending Verification" },
    [LoanStatus.UNDER_REVIEW]: { variant: "warning", label: "Under Review" },
    [LoanStatus.APPROVED]: { variant: "success", label: "Approved" },
    [LoanStatus.REJECTED]: { variant: "error", label: "Rejected" },
    [LoanStatus.DISBURSED]: { variant: "success", label: "Disbursed" },
    [LoanStatus.CLOSED]: { variant: "neutral", label: "Closed" },
  };

  const config = map[status] || { variant: "neutral", label: status };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
