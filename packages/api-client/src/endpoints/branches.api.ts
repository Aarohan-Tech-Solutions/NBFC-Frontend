import { AxiosInstance } from "axios";
import { ApiMode } from "@nbfc/shared-types";
import { mockDatabase, MockBranch } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createBranchesApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getBranches: async (params?: Record<string, unknown>): Promise<MockBranch[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.branches);
      }
      const { data } = await client.get<MockBranch[]>("/branches", { params });
      return data;
    },

    getBranchById: async (id: string): Promise<MockBranch> => {
      if (mode === "mock") {
        const br = mockDatabase.branches.find((b) => b.id === id || b.branchCode === id);
        if (!br) return simulateError("NOT_FOUND", `Branch ${id} not found`, 404);
        return simulateDelay(br);
      }
      const { data } = await client.get<MockBranch>(`/branches/${id}`);
      return data;
    },

    createBranch: async (payload: Partial<MockBranch>): Promise<MockBranch> => {
      if (mode === "mock") {
        const newBr: MockBranch = {
          id: `br-${Date.now()}`,
          branchCode: payload.branchCode || `BR-WB-${Math.floor(10 + Math.random() * 90)}`,
          branchName: payload.branchName || "New Branch Office",
          areaName: payload.areaName || "West Bengal East",
          managerName: payload.managerName || "Assigned Manager",
          underwritingHeadName: payload.underwritingHeadName || "Assigned Credit Head",
          activeDSAs: 0,
          monthlyDisbursed: 0,
          phone: payload.phone || "+91 33 0000 0000",
          status: "active",
        };
        mockDatabase.branches.push(newBr);
        return simulateDelay(newBr);
      }
      const { data } = await client.post<MockBranch>("/branches", payload);
      return data;
    },
  };
}
