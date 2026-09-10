import { customersApi } from "@nbfc/api-client";
import { Customer } from "@nbfc/shared-types";

export async function fetchCustomers(): Promise<Customer[]> {
  return customersApi.getCustomers();
}
