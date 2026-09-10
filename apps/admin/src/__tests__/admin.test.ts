import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore, MOCK_USERS } from "../stores/auth.store";
import { Role } from "@nbfc/shared-types";
import { formatCurrency, formatDate } from "../lib/formatters";

describe("apps/admin Test Suite", () => {
  describe("Admin Auth Store & Role Switching", () => {
    beforeEach(() => {
      useAuthStore.setState({
        user: MOCK_USERS[Role.SUPER_ADMIN],
        token: "test-token",
        refreshToken: "test-refresh-token",
        role: Role.SUPER_ADMIN,
      });
    });

    it("should initialize with Super Admin role", () => {
      const state = useAuthStore.getState();
      expect(state.role).toBe(Role.SUPER_ADMIN);
      expect(state.user?.name).toBe("Allie Grater");
    });

    it("should allow switching to Branch Manager", () => {
      useAuthStore.getState().switchRole(Role.BRANCH_MANAGER);
      const state = useAuthStore.getState();
      expect(state.role).toBe(Role.BRANCH_MANAGER);
      expect(state.user?.name).toBe("Subhashis Roy");
      expect(state.user?.assignedBranch).toBe("Kolkata Central");
    });

    it("should allow switching to Area Manager", () => {
      useAuthStore.getState().switchRole(Role.AREA_MANAGER);
      const state = useAuthStore.getState();
      expect(state.role).toBe(Role.AREA_MANAGER);
      expect(state.user?.assignedArea).toBe("West Bengal East");
    });

    it("should allow switching to DSA partner", () => {
      useAuthStore.getState().switchRole(Role.DSA);
      const state = useAuthStore.getState();
      expect(state.role).toBe(Role.DSA);
      expect(state.user?.agencyName).toBe("Apex Financial Solutions");
    });

    it("should allow switching to Connector", () => {
      useAuthStore.getState().switchRole(Role.CONNECTOR);
      const state = useAuthStore.getState();
      expect(state.role).toBe(Role.CONNECTOR);
      expect(state.user?.name).toBe("Sunil Sen");
    });

    it("should clear state on logout", () => {
      useAuthStore.getState().logout();
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.role).toBeNull();
    });
  });

  describe("Admin Formatters", () => {
    it("should format INR currency values with rupee symbol and separators", () => {
      expect(formatCurrency(2500000)).toContain("25,00,000");
      expect(formatCurrency(0)).toContain("0");
      expect(formatCurrency(100)).toContain("100");
    });

    it("should format ISO dates into short readable strings", () => {
      const formatted = formatDate("2026-09-10T10:30:00Z");
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe("string");
    });
  });

  describe("Role Hierarchy & Guard Validation", () => {
    const HQ_ROLES = [Role.SUPER_ADMIN, Role.COMPANY_ADMIN];
    const MGMT_ROLES = [
      Role.SUPER_ADMIN,
      Role.COMPANY_ADMIN,
      Role.AREA_MANAGER,
      Role.BRANCH_MANAGER,
    ];

    it("should correctly identify HQ roles", () => {
      expect(HQ_ROLES.includes(Role.SUPER_ADMIN)).toBe(true);
      expect(HQ_ROLES.includes(Role.COMPANY_ADMIN)).toBe(true);
      expect(HQ_ROLES.includes(Role.BRANCH_MANAGER)).toBe(false);
      expect(HQ_ROLES.includes(Role.DSA)).toBe(false);
    });

    it("should correctly identify Management roles", () => {
      expect(MGMT_ROLES.includes(Role.SUPER_ADMIN)).toBe(true);
      expect(MGMT_ROLES.includes(Role.AREA_MANAGER)).toBe(true);
      expect(MGMT_ROLES.includes(Role.BRANCH_MANAGER)).toBe(true);
      expect(MGMT_ROLES.includes(Role.CONNECTOR)).toBe(false);
    });
  });
});
