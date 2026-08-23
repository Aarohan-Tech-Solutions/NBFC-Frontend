import { clientPortalApiClient } from "../../lib/apiClient";

export async function loginCustomer(credentials: { phone: string; otp?: string }) {
  const { data } = await clientPortalApiClient.post("/auth/customer-login", credentials);
  return data;
}
