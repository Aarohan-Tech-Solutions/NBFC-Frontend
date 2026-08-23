import { clientPortalApiClient } from "../../lib/apiClient";

export async function fetchCustomerDashboard() {
  const { data } = await clientPortalApiClient.get("/customer/dashboard");
  return data;
}
