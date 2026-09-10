import { mockDatabase } from "./mockDatabase";
import { ApiError } from "../client";

export function simulateDelay<T>(data: T, delayMs: number = 120): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}

export function simulateError(code: string, message: string, status: number = 400): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(
          new ApiError({
            code,
            message,
            status,
          })
        ),
      100
    )
  );
}
