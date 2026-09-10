import { leadsApi } from "@nbfc/api-client";

export async function fetchLeads() {
  return leadsApi.getLeads();
}
