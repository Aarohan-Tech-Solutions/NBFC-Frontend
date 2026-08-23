import { z } from "zod";

export const CommissionSchema = z.object({
  id: z.string().uuid(),
  loanId: z.string().uuid(),
  agentId: z.string().uuid(),
  agentType: z.enum(["dsa", "connector"]),
  commissionPercentage: z.number().positive(),
  payoutAmount: z.number().positive(),
  status: z.enum(["pending", "approved", "paid", "rejected"]),
  disbursedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Commission = z.infer<typeof CommissionSchema>;
