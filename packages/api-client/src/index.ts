import { apiClient } from "./client";
import { createAuthApi } from "./endpoints/auth.api";
import { createLoansApi } from "./endpoints/loans.api";
import { createUsersApi } from "./endpoints/users.api";
import { createDocumentsApi } from "./endpoints/documents.api";

export * from "./client";
export * from "./endpoints/auth.api";
export * from "./endpoints/loans.api";
export * from "./endpoints/users.api";
export * from "./endpoints/documents.api";

export const authApi = createAuthApi(apiClient);
export const loansApi = createLoansApi(apiClient);
export const usersApi = createUsersApi(apiClient);
export const documentsApi = createDocumentsApi(apiClient);
