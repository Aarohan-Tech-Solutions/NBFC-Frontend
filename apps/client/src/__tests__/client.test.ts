import { describe, it, expect, beforeEach } from "vitest";
import { useCustomerAuthStore } from "../stores/auth.store";

describe("apps/client Test Suite", () => {
  describe("Customer Auth Store", () => {
    beforeEach(() => {
      useCustomerAuthStore.setState({
        customer: {
          id: "cust-1",
          fullName: "Rahul Kapoor",
          email: "rahul.kapoor@example.com",
          phone: "+91 9988776655",
          kycVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: "mock-token",
      });
    });

    it("should initialize with default customer credentials", () => {
      const state = useCustomerAuthStore.getState();
      expect(state.customer?.fullName).toBe("Rahul Kapoor");
      expect(state.customer?.kycVerified).toBe(true);
      expect(state.token).toBe("mock-token");
    });

    it("should update auth state on setAuth", () => {
      useCustomerAuthStore.getState().setAuth(
        {
          id: "cust-2",
          fullName: "Ananya Sharma",
          email: "ananya@example.com",
          phone: "+91 9123456780",
          kycVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        "new-token-123"
      );

      const state = useCustomerAuthStore.getState();
      expect(state.customer?.fullName).toBe("Ananya Sharma");
      expect(state.token).toBe("new-token-123");
    });

    it("should clear state on logout", () => {
      useCustomerAuthStore.getState().logout();
      const state = useCustomerAuthStore.getState();
      expect(state.customer).toBeNull();
      expect(state.token).toBeNull();
    });
  });
});
