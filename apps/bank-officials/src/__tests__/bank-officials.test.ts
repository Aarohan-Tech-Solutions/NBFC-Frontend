import { describe, it, expect, beforeEach } from "vitest";
import { formatCurrency, formatDate, formatPercent } from "../lib/formatters";
import { useOfficialAuthStore, MOCK_OFFICIALS } from "../stores/auth.store";
import { Role } from "@nbfc/shared-types";

describe("apps/bank-officials Test Suite", () => {
  describe("Formatters", () => {
    it("should format currency in INR correctly", () => {
      const formatted = formatCurrency(500000);
      expect(formatted).toContain("5,00,000");
    });

    it("should format percentages correctly", () => {
      expect(formatPercent(12.5)).toBe("12.50%");
      expect(formatPercent(0)).toBe("0.00%");
    });

    it("should format dates correctly", () => {
      const formatted = formatDate("2026-09-10T12:00:00Z");
      expect(formatted).toBeTruthy();
      expect(formatDate(null)).toBe("—");
    });
  });

  describe("Bank Official Auth Store & Personas", () => {
    beforeEach(() => {
      useOfficialAuthStore.setState({
        user: MOCK_OFFICIALS[Role.SENIOR_CREDIT_OFFICER],
        token: "mock-token",
        refreshToken: "mock-refresh",
        role: Role.SENIOR_CREDIT_OFFICER,
      });
    });

    it("should initialize with default persona (Senior Credit Officer)", () => {
      const state = useOfficialAuthStore.getState();
      expect(state.user?.role).toBe(Role.SENIOR_CREDIT_OFFICER);
      expect(state.user?.name).toBe("Debashis Banerjee");
    });

    it("should allow switching to Verification Officer persona", () => {
      useOfficialAuthStore.getState().switchRole(Role.VERIFICATION_OFFICER);
      const state = useOfficialAuthStore.getState();
      expect(state.user?.role).toBe(Role.VERIFICATION_OFFICER);
      expect(state.user?.name).toBe("Priya Sundaram");
      expect(state.user?.sanctionLimit).toBe(0);
    });

    it("should allow switching to Disbursement Officer persona", () => {
      useOfficialAuthStore.getState().switchRole(Role.DISBURSEMENT_OFFICER);
      const state = useOfficialAuthStore.getState();
      expect(state.user?.role).toBe(Role.DISBURSEMENT_OFFICER);
      expect(state.user?.name).toBe("Amitabh Sen");
    });

    it("should allow switching to Branch Underwriting Head persona", () => {
      useOfficialAuthStore.getState().switchRole(Role.BRANCH_UNDERWRITING_HEAD);
      const state = useOfficialAuthStore.getState();
      expect(state.user?.role).toBe(Role.BRANCH_UNDERWRITING_HEAD);
      expect(state.user?.name).toBe("Dr. Anirban Mukherjee");
      expect(state.user?.sanctionLimit).toBe(5000000);
    });

    it("should correctly handle logout", () => {
      useOfficialAuthStore.getState().logout();
      const state = useOfficialAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.role).toBeNull();
    });
  });
});
