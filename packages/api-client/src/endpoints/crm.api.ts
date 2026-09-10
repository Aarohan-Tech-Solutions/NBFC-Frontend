import { AxiosInstance } from "axios";
import { ApiMode } from "@nbfc/shared-types";
import { simulateDelay } from "../mock/mockAdapter";

export interface CRMLog {
  id: string;
  leadOrAppId: string;
  type: "call" | "whatsapp" | "email" | "meeting" | "note";
  officerName: string;
  summary: string;
  outcome: string;
  nextFollowUpDate?: string;
  createdAt: string;
}

export function createCrmApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getLogs: async (params?: Record<string, unknown>): Promise<CRMLog[]> => {
      if (mode === "mock") {
        return simulateDelay([
          {
            id: "crm-1",
            leadOrAppId: "LA-9485",
            type: "call",
            officerName: "Debashis Banerjee",
            summary: "Discussed 30-year property valuation report with borrower.",
            outcome: "Borrower agreed with fair market appraisal value ₹65L.",
            nextFollowUpDate: "16 Aug 2026",
            createdAt: "15 Aug 2026, 04:00 PM",
          },
          {
            id: "crm-2",
            leadOrAppId: "LD-8901",
            type: "whatsapp",
            officerName: "Vikas Sharma (DSA)",
            summary: "Shared MSME Udyam documentation checklist via official WhatsApp.",
            outcome: "Borrower acknowledged and promised upload by evening.",
            createdAt: "15 Aug 2026, 02:30 PM",
          },
        ]);
      }
      const { data } = await client.get<CRMLog[]>("/crm/logs", { params });
      return data;
    },

    logActivity: async (payload: Partial<CRMLog>): Promise<CRMLog> => {
      if (mode === "mock") {
        const newLog: CRMLog = {
          id: `crm-${Date.now()}`,
          leadOrAppId: payload.leadOrAppId || "GEN-01",
          type: payload.type || "call",
          officerName: payload.officerName || "Official",
          summary: payload.summary || "Follow-up discussion logged",
          outcome: payload.outcome || "Completed",
          nextFollowUpDate: payload.nextFollowUpDate,
          createdAt: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        return simulateDelay(newLog);
      }
      const { data } = await client.post<CRMLog>("/crm/logs", payload);
      return data;
    },
  };
}
