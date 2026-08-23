import { clientPortalApiClient } from "../../lib/apiClient";
import { Customer } from "@nbfc/shared-types";

export async function fetchCustomerProfile(): Promise<Customer> {
  const { data } = await clientPortalApiClient.get<Customer>("/customer/profile");
  return data;
}
