import { connectorsApi } from "@nbfc/api-client";

export async function fetchConnectors() {
  return connectorsApi.getConnectorsList();
}
