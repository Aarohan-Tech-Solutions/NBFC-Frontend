import { AxiosInstance } from "axios";
import { ApiMode } from "@nbfc/shared-types";
import { mockDatabase, MockArea } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createAreasApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getAreas: async (params?: Record<string, unknown>): Promise<MockArea[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.areas);
      }
      const { data } = await client.get<MockArea[]>("/areas", { params });
      return data;
    },

    getAreaById: async (id: string): Promise<MockArea> => {
      if (mode === "mock") {
        const area = mockDatabase.areas.find((a) => a.id === id || a.areaCode === id);
        if (!area) return simulateError("NOT_FOUND", `Area ${id} not found`, 404);
        return simulateDelay(area);
      }
      const { data } = await client.get<MockArea>(`/areas/${id}`);
      return data;
    },

    createArea: async (payload: Partial<MockArea>): Promise<MockArea> => {
      if (mode === "mock") {
        const newArea: MockArea = {
          id: `area-${Date.now()}`,
          areaCode: payload.areaCode || `AR-${Math.floor(100 + Math.random() * 900)}`,
          areaName: payload.areaName || "New Regional Cluster",
          state: payload.state || "West Bengal",
          areaManagerName: payload.areaManagerName || "Regional Head",
          totalBranches: 1,
          totalDisbursalYTD: 0,
        };
        mockDatabase.areas.push(newArea);
        return simulateDelay(newArea);
      }
      const { data } = await client.post<MockArea>("/areas", payload);
      return data;
    },
  };
}
