import { create } from "zustand";
import { Customer } from "@nbfc/shared-types";

interface CustomerAuthState {
  customer: Customer | null;
  token: string | null;
  setAuth: (customer: Customer, token: string) => void;
  logout: () => void;
}

export const useCustomerAuthStore = create<CustomerAuthState>((set) => ({
  customer: {
    id: "cust-1",
    fullName: "Rahul Kapoor",
    email: "rahul.kapoor@example.com",
    phone: "+91 9988776655",
    kycVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  token: "placeholder-customer-token",
  setAuth: (customer, token) => set({ customer, token }),
  logout: () => set({ customer: null, token: null }),
}));
