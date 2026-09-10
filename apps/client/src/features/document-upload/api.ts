import { documentsApi } from "@nbfc/api-client";
import { DocumentType } from "@nbfc/shared-types";

export async function uploadDocument(docType: DocumentType, file: File) {
  const presigned = await documentsApi.getPresignedUrl(docType, file.name);
  return documentsApi.confirmUpload({
    fileKey: presigned.fileKey,
    docType,
    fileName: file.name,
  });
}
