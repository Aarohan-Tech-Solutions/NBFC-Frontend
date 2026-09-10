import { useState, useEffect } from "react";
import { fetchDashboardStats, DashboardStats } from "../api";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalDisbursedMonth: 48500000,
    activeApplicationsCount: 18,
    totalDSAPartners: 34,
    averageTATDays: 3.2,
    monthlyRevenue: 3840000,
    rejectionRatePercent: 6.8,
    slaBreachCount: 2,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDashboardStats().then((data) => {
      if (data) setStats(data);
      setIsLoading(false);
    });
  }, []);

  return { stats, isLoading };
}
