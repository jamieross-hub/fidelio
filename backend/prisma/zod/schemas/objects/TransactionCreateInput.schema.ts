import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { UserCreateNestedOneWithoutTransactionsInputObjectSchema as UserCreateNestedOneWithoutTransactionsInputObjectSchema } from './UserCreateNestedOneWithoutTransactionsInput.schema'

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
  firstLastDayOfMonth: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutTransactionsInputObjectSchema)
}).strict();
export const TransactionCreateInputObjectSchema: z.ZodType<Prisma.TransactionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreateInput>;
export const TransactionCreateInputObjectZodSchema = makeSchema();
