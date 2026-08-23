import { clientPortalApiClient } from "../../lib/apiClient";

export async function fetchApplicationStatus(appNo: string) {
  const { data } = await clientPortalApiClient.get(`/customer/applications/${appNo}/status`);
  return data;
}
