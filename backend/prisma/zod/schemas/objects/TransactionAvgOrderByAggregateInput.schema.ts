import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amountInPence: SortOrderSchema.optional(),
  recurrenceRate: SortOrderSchema.optional(),
  specificDayOfWeek: SortOrderSchema.optional(),
  specificDayOfMonth: SortOrderSchema.optional()
}).strict();
export const TransactionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TransactionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionAvgOrderByAggregateInput>;
export const TransactionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
