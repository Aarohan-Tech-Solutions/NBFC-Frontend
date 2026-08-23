import { adminApiClient } from "../../lib/apiClient";

export interface DashboardStats {
  totalLoans: number;
  activeDisbursements: number;
  totalDSA: number;
  pendingVerifications: number;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const { data } = await adminApiClient.get<DashboardStats>("/dashboard/stats");
  return data;
}
