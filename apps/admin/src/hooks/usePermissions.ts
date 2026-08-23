import { Role } from "@nbfc/shared-types";
import { useAuth } from "./useAuth";

export function usePermissions() {
  const { role } = useAuth();

  const canAccess = (allowedRoles: Role[]): boolean => {
    if (!role) return false;
    return allowedRoles.includes(role);
  };

  const isSuperAdmin = role === Role.SUPER_ADMIN;
  const isCompanyAdmin = role === Role.COMPANY_ADMIN || isSuperAdmin;
  const isBranchManager = role === Role.BRANCH_MANAGER || isCompanyAdmin;

  return {
    role,
    canAccess,
    isSuperAdmin,
    isCompanyAdmin,
    isBranchManager,
  };
}
