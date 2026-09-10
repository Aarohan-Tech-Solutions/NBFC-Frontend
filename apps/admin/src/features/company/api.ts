import { settingsApi } from "@nbfc/api-client";

export async function fetchCompanyProfile() {
  return settingsApi.getCompanyProfile();
}
