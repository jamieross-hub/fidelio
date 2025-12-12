import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isExpense: SortOrderSchema.optional(),
  amountInPence: SortOrderSchema.optional(),
  startDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  finishDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isRecurring: SortOrderSchema.optional(),
  recurrenceType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  recurrenceRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  specificDayOfWeek: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  specificDayOfMonth: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  firstLastDayOfMonth: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const TransactionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.TransactionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionOrderByWithRelationInput>;
export const TransactionOrderByWithRelationInputObjectZodSchema = makeSchema();
