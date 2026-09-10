import { AxiosInstance } from "axios";
import { ApiMode } from "@nbfc/shared-types";
import { mockDatabase, MockConnector } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createConnectorsApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getConnectorsList: async (params?: Record<string, unknown>): Promise<MockConnector[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.connectors);
      }
      const { data } = await client.get<MockConnector[]>("/connectors", { params });
      return data;
    },

    getConnectorById: async (id: string): Promise<MockConnector> => {
      if (mode === "mock") {
        const conn = mockDatabase.connectors.find((c) => c.id === id || c.code === id);
        if (!conn) return simulateError("NOT_FOUND", `Connector ${id} not found`, 404);
        return simulateDelay(conn);
      }
      const { data } = await client.get<MockConnector>(`/connectors/${id}`);
      return data;
    },

    createConnector: async (payload: Partial<MockConnector>): Promise<MockConnector> => {
      if (mode === "mock") {
        const newConn: MockConnector = {
          id: `con-${Date.now()}`,
          code: `CON-${Math.floor(100 + Math.random() * 900)}`,
          name: payload.name || "Referral Partner",
          dsaName: payload.dsaName || "Apex Financial Solutions",
          phone: payload.phone || "+91 98000 00000",
          email: payload.email || "connector@referral.com",
          leadsReferred: 0,
          convertedLoans: 0,
          commissionPaid: 0,
          status: "active",
        };
        mockDatabase.connectors.push(newConn);
        return simulateDelay(newConn);
      }
      const { data } = await client.post<MockConnector>("/connectors", payload);
      return data;
    },
  };
}
