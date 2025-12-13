import * as z from 'zod';
import type { Prisma } from '../../../generated/client';
import { TransactionCreateManyUserInputObjectSchema as TransactionCreateManyUserInputObjectSchema } from './TransactionCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => TransactionCreateManyUserInputObjectSchema), z.lazy(() => TransactionCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const TransactionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.TransactionCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreateManyUserInputEnvelope>;
export const TransactionCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
