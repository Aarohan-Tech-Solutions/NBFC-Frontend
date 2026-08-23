import { adminApiClient } from "../../lib/apiClient";
import { Customer } from "@nbfc/shared-types";

export async function fetchCustomers(): Promise<Customer[]> {
  const { data } = await adminApiClient.get<Customer[]>("/customers");
  return data;
}
