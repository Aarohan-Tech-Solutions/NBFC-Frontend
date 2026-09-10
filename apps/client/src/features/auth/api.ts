import { authApi } from "@nbfc/api-client";

export async function loginCustomer(credentials: { phone: string; otp?: string }) {
  return authApi.customerLogin(credentials);
}
