import { settingsApi } from "@nbfc/api-client";

export async function fetchCMSContent() {
  return settingsApi.getCMSContent();
}
