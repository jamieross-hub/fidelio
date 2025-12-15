import z from "zod";
import { FIRST_LAST_DAY_OF_MONTH_CHOICES, MONTH_NAMES, RECURRENCE_TYPE_CHOICES } from "../constants";
import { TransactionModelSchema } from "@schemas/pure";

export const MonthSchema = z.object({
    monthName: z.enum(MONTH_NAMES),
    income: z.number(),
    expenses: z.number(),
    remaining: z.number(),
});

export const MonthDateSchema = z.object({
    date: z.string(),
    transactions: z.array(TransactionModelSchema.omit({ user: true })),
});

export const CreateTransactionBodySchema = TransactionModelSchema.omit({
    id: true,
    createdAt: true,
    userId: true,
    user: true,
}).extend({
    amountInPence: z.number(),
    startDate: z.coerce.date().nullable().optional(),
    finishDate: z.coerce.date().nullable().optional(),
    recurrenceType: z.enum(RECURRENCE_TYPE_CHOICES).nullable().optional(),
    recurrenceRate: z.number().nullable().optional(),
    specificDayOfWeek: z.number().min(0).max(6).nullable().optional(),
    specificDayOfMonth: z.number().min(1).max(28).nullable().optional(),
    firstLastDayOfMonth: z.enum(FIRST_LAST_DAY_OF_MONTH_CHOICES).nullable().optional(),
});

export const UpdateTransactionBodySchema = CreateTransactionBodySchema;
