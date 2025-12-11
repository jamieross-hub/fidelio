import * as z from 'zod';
import type { Prisma } from '../../../generated/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const TransactionWhereUniqueInputObjectSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionWhereUniqueInput>;
export const TransactionWhereUniqueInputObjectZodSchema = makeSchema();
