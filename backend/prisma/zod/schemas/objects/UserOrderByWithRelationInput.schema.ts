import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TransactionOrderByRelationAggregateInputObjectSchema as TransactionOrderByRelationAggregateInputObjectSchema } from './TransactionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  authId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  username: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  image: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isGuest: SortOrderSchema.optional(),
  transactions: z.lazy(() => TransactionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
