import z from "zod";
import { TransactionSchema } from "../../../prisma/generated/zod";

export type MonthName =
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december";

export const monthNames: MonthName[] = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
] as const;

export const MonthSchema = z.object({
    monthName: z.enum(monthNames),
    income: z.number(),
    expenses: z.number(),
    remaining: z.number(),
});

export const MonthDateSchema = z.object({
    date: z.string(),
    transactions: z.array(TransactionSchema),
});

export type RecurrenceTypeChoices = "day" | "week" | "month";
export const recurrenceTypeChoices: RecurrenceTypeChoices[] = ["day", "week", "month"];

export type FirstLastDayOfMonthChoices = "first_business" | "last_business" | "last" | "specific";
export const firstLastDayOfMonthChoices: FirstLastDayOfMonthChoices[] = ["first_business", "last_business", "last", "specific"];

export const CreateTransactionBodySchema = TransactionSchema.omit({
    id: true,
    createdAt: true,
    userId: true,
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

export type CreateTransactionBodySchema = z.infer<typeof CreateTransactionBodySchema>;

export const UpdateTransactionBodySchema = CreateTransactionBodySchema;

export type UpdateTransactionBodySchema = z.infer<typeof UpdateTransactionBodySchema>;
