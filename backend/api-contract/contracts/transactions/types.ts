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

export const CreateTransactionBodySchema = TransactionSchema.pick({
    amountInPence: true,
    firstLastDayOfMonth: true,
    isExpense: true,
    isRecurring: true,
    name: true,
    recurrenceRate: true,
    recurrenceType: true,
}).extend({ amountInPence: z.number() });

export const UpdateTransactionBodySchema = CreateTransactionBodySchema;
