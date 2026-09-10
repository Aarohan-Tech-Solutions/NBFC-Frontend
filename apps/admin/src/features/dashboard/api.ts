import { reportsApi, DashboardStats } from "@nbfc/api-client";

export type { DashboardStats };

export async function fetchDashboardStats(): Promise<DashboardStats> {
  return reportsApi.getDashboardStats();
}
