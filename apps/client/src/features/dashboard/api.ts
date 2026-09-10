import { customersApi } from "@nbfc/api-client";

export async function fetchCustomerDashboard() {
  return customersApi.getDashboardStats();
}
