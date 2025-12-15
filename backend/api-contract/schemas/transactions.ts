import z from "zod";
import { firstLastDayOfMonthChoices, monthNames, recurrenceTypeChoices } from "../constants";
import { TransactionModelSchema } from "@schemas/pure";

export const MonthSchema = z.object({
    monthName: z.enum(monthNames),
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
    recurrenceType: z.enum(recurrenceTypeChoices).nullable().optional(),
    recurrenceRate: z.number().nullable().optional(),
    specificDayOfWeek: z.number().min(0).max(6).nullable().optional(),
    specificDayOfMonth: z.number().min(1).max(28).nullable().optional(),
    firstLastDayOfMonth: z.enum(firstLastDayOfMonthChoices).nullable().optional(),
});

export const UpdateTransactionBodySchema = CreateTransactionBodySchema;
