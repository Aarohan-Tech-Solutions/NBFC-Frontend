import { verificationApi } from "@nbfc/api-client";

export async function fetchVerificationTasks() {
  return verificationApi.getVerificationTasks();
}
