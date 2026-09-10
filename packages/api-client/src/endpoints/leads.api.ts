import { AxiosInstance } from "axios";
import { ApiMode } from "@nbfc/shared-types";
import { mockDatabase, MockLead } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createLeadsApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getLeads: async (params?: Record<string, unknown>): Promise<MockLead[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.leads);
      }
      const { data } = await client.get<MockLead[]>("/leads", { params });
      return data;
    },

    getLeadById: async (id: string): Promise<MockLead> => {
      if (mode === "mock") {
        const lead = mockDatabase.leads.find((l) => l.id === id || l.leadNo === id);
        if (!lead) return simulateError("NOT_FOUND", `Lead ${id} not found`, 404);
        return simulateDelay(lead);
      }
      const { data } = await client.get<MockLead>(`/leads/${id}`);
      return data;
    },

    createLead: async (payload: Partial<MockLead>): Promise<MockLead> => {
      if (mode === "mock") {
        const newLead: MockLead = {
          id: `lead-${Date.now()}`,
          leadNo: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
          name: payload.name || "Inquiry Lead",
          phone: payload.phone || "+91 98000 00000",
          email: payload.email || "lead@inquiry.com",
          city: payload.city || "Kolkata",
          loanType: (payload.loanType as any) || "personal",
          expectedAmount: Number(payload.expectedAmount || 1000000),
          source: payload.source || "website",
          sourceName: payload.sourceName,
          status: "new",
          assignedTo: payload.assignedTo || "Unassigned",
          createdAt: new Date().toISOString(),
        };
        mockDatabase.leads.push(newLead);
        return simulateDelay(newLead);
      }
      const { data } = await client.post<MockLead>("/leads", payload);
      return data;
    },

    updateLeadStatus: async (id: string, status: MockLead["status"]): Promise<MockLead> => {
      if (mode === "mock") {
        const lead = mockDatabase.leads.find((l) => l.id === id);
        if (!lead) return simulateError("NOT_FOUND", `Lead ${id} not found`, 404);
        lead.status = status;
        return simulateDelay(lead);
      }
      const { data } = await client.patch<MockLead>(`/leads/${id}/status`, { status });
      return data;
    },

    assignLead: async (id: string, assignedTo: string): Promise<MockLead> => {
      if (mode === "mock") {
        const lead = mockDatabase.leads.find((l) => l.id === id);
        if (!lead) return simulateError("NOT_FOUND", `Lead ${id} not found`, 404);
        lead.assignedTo = assignedTo;
        return simulateDelay(lead);
      }
      const { data } = await client.patch<MockLead>(`/leads/${id}/assign`, { assignedTo });
      return data;
    },
  };
}
