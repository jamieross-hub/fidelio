import * as z from 'zod';
import type { Prisma } from '../../../generated/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string(),
  isExpense: z.boolean().optional(),
  amountInPence: z.number().int(),
  startDate: z.coerce.date().optional().nullable(),
  finishDate: z.coerce.date().optional().nullable(),
  isRecurring: z.boolean().optional(),
  recurrenceType: z.string().optional().nullable(),
  recurrenceRate: z.number().int().optional().nullable(),
  specificDayOfWeek: z.number().int().optional().nullable(),
  specificDayOfMonth: z.number().int().optional().nullable(),
  firstLastDayOfMonth: z.string().optional().nullable()
}).strict();
export const TransactionCreateManyUserInputObjectSchema: z.ZodType<Prisma.TransactionCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreateManyUserInput>;
export const TransactionCreateManyUserInputObjectZodSchema = makeSchema();
