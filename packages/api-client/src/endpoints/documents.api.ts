import { AxiosInstance } from "axios";
import { DocumentType, PresignedUploadResponse, ApiMode } from "@nbfc/shared-types";
import { simulateDelay } from "../mock/mockAdapter";

export interface DocumentItem {
  id: string;
  name: string;
  docType: DocumentType;
  fileKey: string;
  fileUrl: string;
  sizeBytes: number;
  uploadedAt: string;
  verified: boolean;
}

export function createDocumentsApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getDocuments: async (params?: Record<string, unknown>): Promise<DocumentItem[]> => {
      if (mode === "mock") {
        return simulateDelay([
          {
            id: "doc-1",
            name: "Aadhaar_Front_Back.pdf",
            docType: DocumentType.KYC,
            fileKey: "kyc/rahul_aadhaar.pdf",
            fileUrl: "https://nbfc-vault.s3.ap-south-1.amazonaws.com/kyc/rahul_aadhaar.pdf",
            sizeBytes: 1048576,
            uploadedAt: "12 Aug 2026, 10:45 AM",
            verified: true,
          },
          {
            id: "doc-2",
            name: "Form_16_AY2025_26.pdf",
            docType: DocumentType.FINANCIAL,
            fileKey: "financial/form16_2026.pdf",
            fileUrl: "https://nbfc-vault.s3.ap-south-1.amazonaws.com/financial/form16_2026.pdf",
            sizeBytes: 2097152,
            uploadedAt: "12 Aug 2026, 11:00 AM",
            verified: true,
          },
          {
            id: "doc-3",
            name: "Property_Registry_Deed.pdf",
            docType: DocumentType.PROPERTY,
            fileKey: "property/deed_kolkata.pdf",
            fileUrl: "https://nbfc-vault.s3.ap-south-1.amazonaws.com/property/deed_kolkata.pdf",
            sizeBytes: 5242880,
            uploadedAt: "13 Aug 2026, 03:00 PM",
            verified: true,
          },
        ]);
      }
      const { data } = await client.get<DocumentItem[]>("/documents", { params });
      return data;
    },

    getPresignedUrl: async (docType: DocumentType | string, fileName: string): Promise<PresignedUploadResponse> => {
      if (mode === "mock") {
        const fileKey = `uploads/${Date.now()}_${fileName}`;
        return simulateDelay({
          uploadUrl: `https://mock-s3-upload.nbfc.internal/upload?key=${fileKey}`,
          fileKey,
        });
      }
      const { data } = await client.post<PresignedUploadResponse>("/documents/presigned-url", {
        docType,
        fileName,
      });
      return data;
    },

    confirmUpload: async (payload: { fileKey: string; docType?: string; fileName?: string; loanId?: string }): Promise<{ success: boolean; fileUrl: string }> => {
      if (mode === "mock") {
        return simulateDelay({
          success: true,
          fileUrl: `https://nbfc-vault.s3.ap-south-1.amazonaws.com/${payload.fileKey}`,
        });
      }
      const { data } = await client.post<{ success: boolean; fileUrl: string }>("/documents/confirm", payload);
      return data;
    },

    verifyDocument: async (docId: string, verified: boolean, remarks?: string): Promise<{ success: boolean }> => {
      if (mode === "mock") {
        return simulateDelay({ success: true });
      }
      const { data } = await client.patch<{ success: boolean }>(`/documents/${docId}/verify`, {
        verified,
        remarks,
      });
      return data;
    },
  };
}
