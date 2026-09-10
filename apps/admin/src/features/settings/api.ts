import { settingsApi } from "@nbfc/api-client";

export async function fetchSettings() {
  return settingsApi.getCompanySettings();
}
