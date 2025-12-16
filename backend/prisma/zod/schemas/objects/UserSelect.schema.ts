import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { TransactionFindManySchema as TransactionFindManySchema } from '../findManyTransaction.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  authId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  email: z.boolean().optional(),
  username: z.boolean().optional(),
  image: z.boolean().optional(),
  isGuest: z.boolean().optional(),
  transactions: z.union([z.boolean(), z.lazy(() => TransactionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
