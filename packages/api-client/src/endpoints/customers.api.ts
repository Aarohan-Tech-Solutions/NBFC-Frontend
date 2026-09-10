import { AxiosInstance } from "axios";
import { Customer, ApiMode } from "@nbfc/shared-types";
import { mockDatabase } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createCustomersApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getCustomers: async (params?: Record<string, unknown>): Promise<Customer[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.customers);
      }
      const { data } = await client.get<Customer[]>("/customers", { params });
      return data;
    },

    getCustomerById: async (id: string): Promise<Customer> => {
      if (mode === "mock") {
        const cust = mockDatabase.customers.find((c) => c.id === id);
        if (!cust) return simulateError("NOT_FOUND", `Customer ${id} not found`, 404);
        return simulateDelay(cust);
      }
      const { data } = await client.get<Customer>(`/customers/${id}`);
      return data;
    },

    getProfile: async (): Promise<Customer> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.customers[0]);
      }
      const { data } = await client.get<Customer>("/customer/profile");
      return data;
    },

    getDashboardStats: async (): Promise<any> => {
      if (mode === "mock") {
        return simulateDelay({
          activeLoansCount: 2,
          totalSanctionedAmount: 5300000,
          totalOutstanding: 4890000,
          nextEmiDate: "05 Sep 2026",
          nextEmiAmount: 46250,
          kycStatus: "VERIFIED",
          creditScore: 785,
        });
      }
      const { data } = await client.get("/customer/dashboard");
      return data;
    },

    createCustomer: async (payload: Partial<Customer>): Promise<Customer> => {
      if (mode === "mock") {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          fullName: payload.fullName || "New Customer",
          email: payload.email || "borrower@example.com",
          phone: payload.phone || "+91 99000 00000",
          panNumber: payload.panNumber || "ABCDE1234F",
          aadhaarNumber: payload.aadhaarNumber || "1234-5678-9012",
          city: payload.city || "Kolkata",
          state: payload.state || "West Bengal",
          pincode: payload.pincode || "700001",
          kycVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockDatabase.customers.push(newCust);
        return simulateDelay(newCust);
      }
      const { data } = await client.post<Customer>("/customers", payload);
      return data;
    },

    updateCustomer: async (id: string, payload: Partial<Customer>): Promise<Customer> => {
      if (mode === "mock") {
        const cust = mockDatabase.customers.find((c) => c.id === id);
        if (!cust) return simulateError("NOT_FOUND", `Customer ${id} not found`, 404);
        Object.assign(cust, payload, { updatedAt: new Date().toISOString() });
        return simulateDelay(cust);
      }
      const { data } = await client.put<Customer>(`/customers/${id}`, payload);
      return data;
    },
  };
}
