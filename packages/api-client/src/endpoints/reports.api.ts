import { AxiosInstance } from "axios";
import { ApiMode } from "@nbfc/shared-types";
import { simulateDelay } from "../mock/mockAdapter";

export interface DashboardStats {
  totalDisbursedMonth: number;
  activeApplicationsCount: number;
  totalDSAPartners: number;
  averageTATDays: number;
  monthlyRevenue: number;
  rejectionRatePercent: number;
  slaBreachCount: number;
}

export function createReportsApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getDashboardStats: async (): Promise<DashboardStats> => {
      if (mode === "mock") {
        return simulateDelay({
          totalDisbursedMonth: 48500000,
          activeApplicationsCount: 18,
          totalDSAPartners: 34,
          averageTATDays: 3.2,
          monthlyRevenue: 3840000,
          rejectionRatePercent: 6.8,
          slaBreachCount: 2,
        });
      }
      const { data } = await client.get<DashboardStats>("/dashboard/stats");
      return data;
    },

    getPortfolioSummary: async (params?: Record<string, unknown>): Promise<any> => {
      if (mode === "mock") {
        return simulateDelay({
          totalAUM: 425000000,
          productBreakdown: [
            { product: "Home Loan", sharePercent: 42, value: 178500000 },
            { product: "Mortgage Loan (LAP)", sharePercent: 28, value: 119000000 },
            { product: "Business Loan", sharePercent: 18, value: 76500000 },
            { product: "Personal Loan", sharePercent: 8, value: 34000000 },
            { product: "Car Loan", sharePercent: 4, value: 17000000 },
          ],
          monthlyDisbursalTrend: [
            { month: "Jan 2026", amount: 32000000 },
            { month: "Feb 2026", amount: 38000000 },
            { month: "Mar 2026", amount: 45000000 },
            { month: "Apr 2026", amount: 41000000 },
            { month: "May 2026", amount: 49000000 },
            { month: "Jun 2026", amount: 54000000 },
            { month: "Jul 2026", amount: 58000000 },
            { month: "Aug 2026 (MTD)", amount: 48500000 },
          ],
        });
      }
      const { data } = await client.get("/reports", { params });
      return data;
    },

    getBranchReports: async (): Promise<any[]> => {
      if (mode === "mock") {
        return simulateDelay([
          { branchName: "Kolkata Central", disbursed: 42000000, target: 40000000, tat: 3.1, slaAdherence: 96.5 },
          { branchName: "Salt Lake Sector V", disbursed: 28000000, target: 30000000, tat: 3.4, slaAdherence: 94.2 },
          { branchName: "Howrah Main", disbursed: 18500000, target: 20000000, tat: 3.8, slaAdherence: 91.0 },
        ]);
      }
      const { data } = await client.get("/reports/branches");
      return data;
    },
  };
}
