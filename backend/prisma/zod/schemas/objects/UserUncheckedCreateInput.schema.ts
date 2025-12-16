import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema as TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TransactionUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  authId: z.string(),
  createdAt: z.coerce.date().optional(),
  email: z.string(),
  username: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  isGuest: z.boolean().optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
