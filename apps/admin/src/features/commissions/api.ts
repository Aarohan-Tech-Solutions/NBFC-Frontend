import { adminApiClient } from "../../lib/apiClient";
import { Commission } from "@nbfc/shared-types";

export async function fetchCommissions(): Promise<Commission[]> {
  const { data } = await adminApiClient.get<Commission[]>("/commissions");
  return data;
}
