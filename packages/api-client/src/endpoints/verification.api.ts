import { AxiosInstance } from "axios";
import { ApiMode, VerificationReviewInput } from "@nbfc/shared-types";
import { mockDatabase, MockVerificationTask } from "../mock/mockDatabase";
import { simulateDelay, simulateError } from "../mock/mockAdapter";

export function createVerificationApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getVerificationTasks: async (params?: Record<string, unknown>): Promise<MockVerificationTask[]> => {
      if (mode === "mock") {
        let results = [...mockDatabase.verificationTasks];
        if (params?.category && params.category !== "all") {
          results = results.filter((t) => t.category.toLowerCase() === String(params.category).toLowerCase());
        }
        if (params?.status && params.status !== "all") {
          results = results.filter((t) => t.status.toLowerCase() === String(params.status).toLowerCase());
        }
        return simulateDelay(results);
      }
      const { data } = await client.get<MockVerificationTask[]>("/verification/queue", { params });
      return data;
    },

    getTaskById: async (id: string): Promise<MockVerificationTask> => {
      if (mode === "mock") {
        const task = mockDatabase.verificationTasks.find((t) => t.id === id);
        if (!task) {
          return simulateError("NOT_FOUND", `Verification task ${id} not found`, 404);
        }
        return simulateDelay(task);
      }
      const { data } = await client.get<MockVerificationTask>(`/verification/tasks/${id}`);
      return data;
    },

    updateTaskStatus: async (
      id: string,
      status: MockVerificationTask["status"],
      remarks?: string
    ): Promise<MockVerificationTask> => {
      if (mode === "mock") {
        const task = mockDatabase.verificationTasks.find((t) => t.id === id);
        if (!task) {
          return simulateError("NOT_FOUND", `Verification task ${id} not found`, 404);
        }
        task.status = status;
        if (remarks) task.remarks = remarks;
        return simulateDelay(task);
      }
      const { data } = await client.patch<MockVerificationTask>(`/verification/tasks/${id}`, {
        status,
        remarks,
      });
      return data;
    },

    submitVerificationReview: async (payload: VerificationReviewInput): Promise<{ success: boolean; task: MockVerificationTask }> => {
      if (mode === "mock") {
        const task = mockDatabase.verificationTasks.find((t) => t.id === payload.taskId);
        if (task) {
          task.status = payload.status === "verified" ? "Verified" : payload.status === "rejected" ? "Rejected" : "Action Required";
          task.remarks = payload.remarks;
        }
        return simulateDelay({ success: true, task: task || mockDatabase.verificationTasks[0] });
      }
      const { data } = await client.post<{ success: boolean; task: MockVerificationTask }>(
        `/verification/tasks/${payload.taskId}/review`,
        payload
      );
      return data;
    },
  };
}
