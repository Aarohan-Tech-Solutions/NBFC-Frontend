import { Role } from "@nbfc/shared-types";
import { useAuth } from "./useAuth";

export function usePermissions() {
  const { role, user } = useAuth();

  const canAccess = (allowedRoles: Role[]): boolean => {
    if (!role) return false;
    return allowedRoles.includes(role);
  };

  const isSuperAdmin = role === Role.SUPER_ADMIN;
  const isCompanyAdmin = role === Role.COMPANY_ADMIN;
  const isAreaManager = role === Role.AREA_MANAGER;
  const isBranchManager = role === Role.BRANCH_MANAGER;
  const isDSA = role === Role.DSA;
  const isConnector = role === Role.CONNECTOR;
  const isStaff = role === Role.STAFF;

  // Management access (Can manage entities like branches/DSAs/areas)
  const canManageEntities = isSuperAdmin || isCompanyAdmin || isAreaManager || isBranchManager;
  const isHQAdmin = isSuperAdmin || isCompanyAdmin;

  return {
    role,
    user,
    canAccess,
    isSuperAdmin,
    isCompanyAdmin,
    isAreaManager,
    isBranchManager,
    isDSA,
    isConnector,
    isStaff,
    canManageEntities,
    isHQAdmin,
  };
}
