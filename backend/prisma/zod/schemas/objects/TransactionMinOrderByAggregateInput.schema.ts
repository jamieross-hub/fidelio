import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isExpense: SortOrderSchema.optional(),
  amountInPence: SortOrderSchema.optional(),
  startDate: SortOrderSchema.optional(),
  finishDate: SortOrderSchema.optional(),
  isRecurring: SortOrderSchema.optional(),
  recurrenceType: SortOrderSchema.optional(),
  recurrenceRate: SortOrderSchema.optional(),
  specificDayOfWeek: SortOrderSchema.optional(),
  specificDayOfMonth: SortOrderSchema.optional(),
  firstLastDayOfMonth: SortOrderSchema.optional()
}).strict();
export const TransactionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TransactionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionMinOrderByAggregateInput>;
export const TransactionMinOrderByAggregateInputObjectZodSchema = makeSchema();
