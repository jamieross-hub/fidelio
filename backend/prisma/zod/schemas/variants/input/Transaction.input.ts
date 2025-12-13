import * as z from 'zod';
// prettier-ignore
export const TransactionInputSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    isExpense: z.boolean(),
    amountInPence: z.number().int(),
    startDate: z.date().optional().nullable(),
    finishDate: z.date().optional().nullable(),
    isRecurring: z.boolean(),
    recurrenceType: z.string().optional().nullable(),
    recurrenceRate: z.number().int().optional().nullable(),
    specificDayOfWeek: z.number().int().optional().nullable(),
    specificDayOfMonth: z.number().int().optional().nullable(),
    firstLastDayOfMonth: z.string().optional().nullable()
}).strict();

export type TransactionInputType = z.infer<typeof TransactionInputSchema>;
