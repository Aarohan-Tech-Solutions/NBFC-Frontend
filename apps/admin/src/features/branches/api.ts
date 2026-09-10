import { branchesApi } from "@nbfc/api-client";

export async function fetchBranches() {
  return branchesApi.getBranches();
}
