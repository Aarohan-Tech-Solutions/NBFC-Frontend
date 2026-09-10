import { settingsApi } from "@nbfc/api-client";

export async function fetchRolesPermissions() {
  return settingsApi.getRolesAndPermissions();
}
