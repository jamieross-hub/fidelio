import * as z from 'zod';
// prettier-ignore
export const TransactionModelSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    isExpense: z.boolean(),
    amountInPence: z.number().int(),
    startDate: z.date().nullable(),
    finishDate: z.date().nullable(),
    isRecurring: z.boolean(),
    recurrenceType: z.string().nullable(),
    recurrenceRate: z.number().int().nullable(),
    specificDayOfWeek: z.number().int().nullable(),
    specificDayOfMonth: z.number().int().nullable(),
    firstLastDayOfMonth: z.string().nullable()
}).strict();

export type TransactionPureType = z.infer<typeof TransactionModelSchema>;
