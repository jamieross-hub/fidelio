import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  isExpense: z.boolean().optional(),
  amountInPence: z.boolean().optional(),
  startDate: z.boolean().optional(),
  finishDate: z.boolean().optional(),
  isRecurring: z.boolean().optional(),
  recurrenceType: z.boolean().optional(),
  recurrenceRate: z.boolean().optional(),
  specificDayOfWeek: z.boolean().optional(),
  specificDayOfMonth: z.boolean().optional(),
  firstLastDayOfMonth: z.boolean().optional()
}).strict();
export const TransactionSelectObjectSchema: z.ZodType<Prisma.TransactionSelect> = makeSchema() as unknown as z.ZodType<Prisma.TransactionSelect>;
export const TransactionSelectObjectZodSchema = makeSchema();
