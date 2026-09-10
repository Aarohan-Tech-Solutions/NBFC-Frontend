import { customersApi } from "@nbfc/api-client";
import { Customer } from "@nbfc/shared-types";

export async function fetchCustomerProfile(): Promise<Customer> {
  return customersApi.getProfile();
}
