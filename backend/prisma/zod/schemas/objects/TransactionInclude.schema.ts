import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const TransactionIncludeObjectSchema: z.ZodType<Prisma.TransactionInclude> = makeSchema() as unknown as z.ZodType<Prisma.TransactionInclude>;
export const TransactionIncludeObjectZodSchema = makeSchema();
