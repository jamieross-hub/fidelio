import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema'

const transactionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => TransactionScalarWhereInputObjectSchema), z.lazy(() => TransactionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TransactionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TransactionScalarWhereInputObjectSchema), z.lazy(() => TransactionScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  isExpense: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  amountInPence: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  startDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  finishDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  isRecurring: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  recurrenceType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  recurrenceRate: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  specificDayOfWeek: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  specificDayOfMonth: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  firstLastDayOfMonth: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const TransactionScalarWhereInputObjectSchema: z.ZodType<Prisma.TransactionScalarWhereInput> = transactionscalarwhereinputSchema as unknown as z.ZodType<Prisma.TransactionScalarWhereInput>;
export const TransactionScalarWhereInputObjectZodSchema = transactionscalarwhereinputSchema;
