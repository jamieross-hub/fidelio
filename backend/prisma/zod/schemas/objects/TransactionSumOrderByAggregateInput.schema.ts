import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amountInPence: SortOrderSchema.optional(),
  recurrenceRate: SortOrderSchema.optional(),
  specificDayOfWeek: SortOrderSchema.optional(),
  specificDayOfMonth: SortOrderSchema.optional()
}).strict();
export const TransactionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TransactionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionSumOrderByAggregateInput>;
export const TransactionSumOrderByAggregateInputObjectZodSchema = makeSchema();
