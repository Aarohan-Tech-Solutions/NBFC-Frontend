import { dsaApi } from "@nbfc/api-client";

export async function fetchDSAPartners() {
  return dsaApi.getDSAList();
}
