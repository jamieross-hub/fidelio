import type { Prisma } from '../../generated/client';
import * as z from 'zod';
import { TransactionIncludeObjectSchema as TransactionIncludeObjectSchema } from './objects/TransactionInclude.schema';
import { TransactionOrderByWithRelationInputObjectSchema as TransactionOrderByWithRelationInputObjectSchema } from './objects/TransactionOrderByWithRelationInput.schema';
import { TransactionWhereInputObjectSchema as TransactionWhereInputObjectSchema } from './objects/TransactionWhereInput.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './objects/TransactionWhereUniqueInput.schema';
import { TransactionScalarFieldEnumSchema } from './enums/TransactionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TransactionFindFirstSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    isExpense: z.boolean().optional(),
    amountInPence: z.boolean().optional(),
    startDate: z.boolean().optional(),
    finishDate: z.boolean().optional(),
    isRecurring: z.boolean().optional(),
    recurrenceType: z.boolean().optional(),
    recurrenceRate: z.boolean().optional(),
    specificDayOfWeek: z.boolean().optional(),
    specificDayOfMonth: z.boolean().optional(),
    firstLastDayOfMonth: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.TransactionSelect>;

export const TransactionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    isExpense: z.boolean().optional(),
    amountInPence: z.boolean().optional(),
    startDate: z.boolean().optional(),
    finishDate: z.boolean().optional(),
    isRecurring: z.boolean().optional(),
    recurrenceType: z.boolean().optional(),
    recurrenceRate: z.boolean().optional(),
    specificDayOfWeek: z.boolean().optional(),
    specificDayOfMonth: z.boolean().optional(),
    firstLastDayOfMonth: z.boolean().optional()
  }).strict();

export const TransactionFindFirstSchema: z.ZodType<Prisma.TransactionFindFirstArgs> = z.object({ select: TransactionFindFirstSelectSchema.optional(), include: z.lazy(() => TransactionIncludeObjectSchema.optional()), orderBy: z.union([TransactionOrderByWithRelationInputObjectSchema, TransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: TransactionWhereInputObjectSchema.optional(), cursor: TransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TransactionScalarFieldEnumSchema, TransactionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.TransactionFindFirstArgs>;

export const TransactionFindFirstZodSchema = z.object({ select: TransactionFindFirstSelectSchema.optional(), include: z.lazy(() => TransactionIncludeObjectSchema.optional()), orderBy: z.union([TransactionOrderByWithRelationInputObjectSchema, TransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: TransactionWhereInputObjectSchema.optional(), cursor: TransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TransactionScalarFieldEnumSchema, TransactionScalarFieldEnumSchema.array()]).optional() }).strict();