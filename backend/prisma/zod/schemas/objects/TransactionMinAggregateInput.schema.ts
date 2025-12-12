import * as z from 'zod';
import type { Prisma } from '../../../generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  isExpense: z.literal(true).optional(),
  amountInPence: z.literal(true).optional(),
  startDate: z.literal(true).optional(),
  finishDate: z.literal(true).optional(),
  isRecurring: z.literal(true).optional(),
  recurrenceType: z.literal(true).optional(),
  recurrenceRate: z.literal(true).optional(),
  specificDayOfWeek: z.literal(true).optional(),
  specificDayOfMonth: z.literal(true).optional(),
  firstLastDayOfMonth: z.literal(true).optional()
}).strict();
export const TransactionMinAggregateInputObjectSchema: z.ZodType<Prisma.TransactionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TransactionMinAggregateInputType>;
export const TransactionMinAggregateInputObjectZodSchema = makeSchema();
