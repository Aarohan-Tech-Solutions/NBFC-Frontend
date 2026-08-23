import { z } from "zod";
import { LoanType, LoanStatus } from "../enums/loans.enum";

export const LoanSchema = z.object({
  id: z.string().uuid(),
  applicationNo: z.string(),
  customerId: z.string().uuid(),
  loanType: z.nativeEnum(LoanType),
  status: z.nativeEnum(LoanStatus),
  amount: z.number().positive(),
  tenureMonths: z.number().int().positive(),
  interestRate: z.number().nonnegative(),
  dsaId: z.string().optional(),
  connectorId: z.string().optional(),
  branchId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Loan = z.infer<typeof LoanSchema>;
