import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { TransactionCreateNestedManyWithoutUserInputObjectSchema as TransactionCreateNestedManyWithoutUserInputObjectSchema } from './TransactionCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  authId: z.string(),
  createdAt: z.coerce.date().optional(),
  email: z.string(),
  username: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  isGuest: z.boolean().optional(),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = makeSchema();
