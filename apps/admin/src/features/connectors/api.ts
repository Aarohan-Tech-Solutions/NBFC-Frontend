import { adminApiClient } from "../../lib/apiClient";

export async function fetchConnectors() {
  const { data } = await adminApiClient.get("/connectors");
  return data;
}
