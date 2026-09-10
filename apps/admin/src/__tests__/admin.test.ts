import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore, MOCK_USERS } from "../stores/auth.store";
import { Role } from "@nbfc/shared-types";

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
});
