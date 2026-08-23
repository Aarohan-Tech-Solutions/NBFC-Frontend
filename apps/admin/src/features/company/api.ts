import { adminApiClient } from "../../lib/apiClient";

export async function fetchCompanyProfile() {
  const { data } = await adminApiClient.get("/company/profile");
  return data;
}
