import * as z from 'zod';
import type { Prisma } from '../../../generated/client';


const makeSchema = () => z.object({
  amountInPence: z.literal(true).optional(),
  recurrenceRate: z.literal(true).optional(),
  specificDayOfWeek: z.literal(true).optional(),
  specificDayOfMonth: z.literal(true).optional()
}).strict();
export const TransactionAvgAggregateInputObjectSchema: z.ZodType<Prisma.TransactionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TransactionAvgAggregateInputType>;
export const TransactionAvgAggregateInputObjectZodSchema = makeSchema();
