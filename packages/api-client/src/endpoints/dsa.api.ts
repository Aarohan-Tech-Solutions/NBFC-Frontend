import { AxiosInstance } from "axios";
import { ApiMode } from "@nbfc/shared-types";
import { mockDatabase, MockDSA } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createDsaApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getDSAList: async (params?: Record<string, unknown>): Promise<MockDSA[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.dsas);
      }
      const { data } = await client.get<MockDSA[]>("/dsa", { params });
      return data;
    },

    getDSAById: async (id: string): Promise<MockDSA> => {
      if (mode === "mock") {
        const dsa = mockDatabase.dsas.find((d) => d.id === id || d.code === id);
        if (!dsa) return simulateError("NOT_FOUND", `DSA ${id} not found`, 404);
        return simulateDelay(dsa);
      }
      const { data } = await client.get<MockDSA>(`/dsa/${id}`);
      return data;
    },

    createDSA: async (payload: Partial<MockDSA>): Promise<MockDSA> => {
      if (mode === "mock") {
        const newDsa: MockDSA = {
          id: `dsa-${Date.now()}`,
          code: `DSA-${Math.floor(1000 + Math.random() * 9000)}`,
          agencyName: payload.agencyName || "New DSA Agency",
          contactPerson: payload.contactPerson || "Partner",
          email: payload.email || "dsa@partner.com",
          phone: payload.phone || "+91 98000 00000",
          city: payload.city || "Kolkata",
          branchName: payload.branchName || "Kolkata Central",
          activeConnectors: 0,
          totalDisbursed: 0,
          commissionEarned: 0,
          status: "active",
        };
        mockDatabase.dsas.push(newDsa);
        return simulateDelay(newDsa);
      }
      const { data } = await client.post<MockDSA>("/dsa", payload);
      return data;
    },

    updateDSA: async (id: string, payload: Partial<MockDSA>): Promise<MockDSA> => {
      if (mode === "mock") {
        const dsa = mockDatabase.dsas.find((d) => d.id === id);
        if (!dsa) return simulateError("NOT_FOUND", `DSA ${id} not found`, 404);
        Object.assign(dsa, payload);
        return simulateDelay(dsa);
      }
      const { data } = await client.put<MockDSA>(`/dsa/${id}`, payload);
      return data;
    },
  };
}
