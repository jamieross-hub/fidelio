import * as z from 'zod';
export const TransactionFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  createdAt: z.date(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  isExpense: z.boolean(),
  amountInPence: z.number().int(),
  startDate: z.date().optional(),
  finishDate: z.date().optional(),
  isRecurring: z.boolean(),
  recurrenceType: z.string().optional(),
  recurrenceRate: z.number().int().optional(),
  specificDayOfWeek: z.number().int().optional(),
  specificDayOfMonth: z.number().int().optional(),
  firstLastDayOfMonth: z.string().optional()
}));