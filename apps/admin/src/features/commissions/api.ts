import { commissionsApi } from "@nbfc/api-client";
import { Commission } from "@nbfc/shared-types";

export async function fetchCommissions(): Promise<Commission[]> {
  return commissionsApi.getCommissions();
}
