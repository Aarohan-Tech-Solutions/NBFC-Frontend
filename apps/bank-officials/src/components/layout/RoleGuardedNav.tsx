import React from "react";
import { useOfficialAuthStore } from "../../stores/auth.store";
import { Role } from "@nbfc/shared-types";

export interface RoleGuardedProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export const RoleGuarded: React.FC<RoleGuardedProps> = ({ allowedRoles, children }) => {
  const { role } = useOfficialAuthStore();
  if (!role || !allowedRoles.includes(role)) {
    return null;
  }
  return <>{children}</>;
};
