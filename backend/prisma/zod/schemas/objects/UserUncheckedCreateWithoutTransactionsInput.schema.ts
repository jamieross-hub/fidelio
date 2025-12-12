import * as z from 'zod';
import type { Prisma } from '../../../generated/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  authId: z.string(),
  createdAt: z.coerce.date().optional(),
  email: z.string(),
  username: z.string().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();
export const UserUncheckedCreateWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutTransactionsInput>;
export const UserUncheckedCreateWithoutTransactionsInputObjectZodSchema = makeSchema();
