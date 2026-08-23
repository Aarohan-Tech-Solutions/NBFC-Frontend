import { AxiosInstance } from "axios";
import { DocumentType } from "@nbfc/shared-types";

export interface PresignedUploadResponse {
  uploadUrl: string;
  fileKey: string;
}

export function createDocumentsApi(client: AxiosInstance) {
  return {
    getPresignedUrl: async (docType: DocumentType, fileName: string): Promise<PresignedUploadResponse> => {
      const { data } = await client.post<PresignedUploadResponse>("/documents/presigned-url", {
        docType,
        fileName,
      });
      return data;
    },
    confirmUpload: async (fileKey: string, docType: DocumentType): Promise<{ success: boolean }> => {
      const { data } = await client.post<{ success: boolean }>("/documents/confirm", {
        fileKey,
        docType,
      });
      return data;
    },
  };
}
