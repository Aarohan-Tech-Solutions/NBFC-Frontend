import React from "react";
import { Role } from "@nbfc/shared-types";
import { usePermissions } from "../../hooks/usePermissions";

interface RoleGuardedNavProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuardedNav: React.FC<RoleGuardedNavProps> = ({
  allowedRoles,
  children,
  fallback = null,
}) => {
  const { canAccess } = usePermissions();

  if (!canAccess(allowedRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
