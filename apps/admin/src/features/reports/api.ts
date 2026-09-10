import { reportsApi } from "@nbfc/api-client";

export async function fetchReports() {
  return reportsApi.getPortfolioSummary();
}
