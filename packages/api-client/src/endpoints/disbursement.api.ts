import { AxiosInstance } from "axios";
import { ApiMode, DisbursementAuthorizationInput } from "@nbfc/shared-types";
import { mockDatabase, MockDisbursementRecord } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createDisbursementApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getDisbursements: async (params?: Record<string, unknown>): Promise<MockDisbursementRecord[]> => {
      if (mode === "mock") {
        let results = [...mockDatabase.disbursements];
        if (params?.status && params.status !== "all") {
          results = results.filter((d) => d.status.toLowerCase() === String(params.status).toLowerCase());
        }
        return simulateDelay(results);
      }
      const { data } = await client.get<MockDisbursementRecord[]>("/disbursement", { params });
      return data;
    },

    getDisbursementById: async (id: string): Promise<MockDisbursementRecord> => {
      if (mode === "mock") {
        const item = mockDatabase.disbursements.find((d) => d.id === id);
        if (!item) {
          return simulateError("NOT_FOUND", `Disbursement record ${id} not found`, 404);
        }
        return simulateDelay(item);
      }
      const { data } = await client.get<MockDisbursementRecord>(`/disbursement/${id}`);
      return data;
    },

    authorizeDisbursement: async (payload: DisbursementAuthorizationInput): Promise<{ success: boolean; record: MockDisbursementRecord }> => {
      if (mode === "mock") {
        let record = mockDatabase.disbursements.find((d) => d.loanId === payload.loanId);
        if (!record) {
          record = {
            id: `disb-${Date.now()}`,
            appNo: `LA-${Math.floor(1000 + Math.random() * 9000)}`,
            loanId: payload.loanId,
            customerName: payload.accountHolder,
            customerPhone: "+91 99887 76655",
            loanProduct: "Home Loan",
            sanctionedAmount: payload.sanctionedAmount,
            processingFee: payload.deductions.processingFee,
            insuranceFee: payload.deductions.insurance,
            netDisbursal: payload.netDisbursal,
            bankName: payload.beneficiaryBank,
            accountNumber: payload.accountNumber,
            ifsc: payload.ifsc,
            accountHolder: payload.accountHolder,
            txnId: payload.transactionId || `RTGS-${Date.now()}`,
            paymentMode: payload.paymentMode,
            status: "Success",
            disbursedDate: new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          mockDatabase.disbursements.unshift(record);
        } else {
          record.status = "Success";
          record.txnId = payload.transactionId;
          record.disbursedDate = new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        }
        return simulateDelay({ success: true, record });
      }
      const { data } = await client.post<{ success: boolean; record: MockDisbursementRecord }>(
        `/disbursement/authorize`,
        payload
      );
      return data;
    },

    generateBatchPayment: async (loanIds: string[]): Promise<{ batchId: string; totalAmount: number; count: number }> => {
      if (mode === "mock") {
        return simulateDelay({
          batchId: `BATCH-${Date.now()}`,
          totalAmount: 12500000,
          count: loanIds.length || 3,
        });
      }
      const { data } = await client.post<{ batchId: string; totalAmount: number; count: number }>(
        `/disbursement/batch-generate`,
        { loanIds }
      );
      return data;
    },
  };
}
