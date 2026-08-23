import { useState, useEffect } from "react";
import { DashboardStats } from "../api";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLoans: 1420,
    activeDisbursements: 85000000,
    totalDSA: 340,
    pendingVerifications: 28,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Placeholder hook logic
    setIsLoading(false);
  }, []);

  return { stats, isLoading };
}
