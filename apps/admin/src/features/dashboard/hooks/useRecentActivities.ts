import { useState } from "react";

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: string;
}

export function useRecentActivities() {
  const [activities] = useState<ActivityItem[]>([
    { id: "1", title: "New Loan Application #LA-9021 submitted", timestamp: "10 mins ago", type: "loan" },
    { id: "2", title: "KYC Verified for Customer Rajesh Kumar", timestamp: "25 mins ago", type: "kyc" },
    { id: "3", title: "DSA Onboarded: Apex Financial Services", timestamp: "1 hour ago", type: "dsa" },
  ]);

  return { activities };
}
