import { AxiosInstance } from "axios";
import { Commission, ApiMode } from "@nbfc/shared-types";
import { mockDatabase } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createCommissionsApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getCommissions: async (params?: Record<string, unknown>): Promise<Commission[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.commissions);
      }
      const { data } = await client.get<Commission[]>("/commissions", { params });
      return data;
    },

    processPayout: async (id: string): Promise<Commission> => {
      if (mode === "mock") {
        const comm = mockDatabase.commissions.find((c) => c.id === id);
        if (!comm) return simulateError("NOT_FOUND", `Commission record ${id} not found`, 404);
        comm.status = "paid";
        comm.disbursedAt = new Date().toISOString();
        return simulateDelay(comm);
      }
      const { data } = await client.post<Commission>(`/commissions/${id}/payout`);
      return data;
    },
  };
}
