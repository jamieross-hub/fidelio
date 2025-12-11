import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { UserCountOutputTypeCountTransactionsArgsObjectSchema as UserCountOutputTypeCountTransactionsArgsObjectSchema } from './UserCountOutputTypeCountTransactionsArgs.schema'

const makeSchema = () => z.object({
  transactions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountTransactionsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
