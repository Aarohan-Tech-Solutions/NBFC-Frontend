import { areasApi } from "@nbfc/api-client";

export async function fetchAreas() {
  return areasApi.getAreas();
}
