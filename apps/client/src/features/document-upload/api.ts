import { clientPortalApiClient } from "../../lib/apiClient";
import { DocumentType } from "@nbfc/shared-types";

export async function uploadDocument(docType: DocumentType, file: File) {
  const { data } = await clientPortalApiClient.post("/documents/upload-s3", {
    docType,
    fileName: file.name,
  });
  return data;
}
