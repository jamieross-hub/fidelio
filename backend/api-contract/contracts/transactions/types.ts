import z from "zod";
import { TransactionSchema } from "../../../prisma/generated/zod";

export type MonthName =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

export const monthNames: MonthName[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

export const MonthSchema = z.object({
    monthName: z.enum(monthNames),
    income: z.number(),
    expenses: z.number(),
    remaining: z.number(),
});

export const MonthDateSchema = z.object({
    date: z.date(),
    transactions: z.array(TransactionSchema),
});

export const CreateTransactionBodySchema = TransactionSchema.omit({ id: true, createdAt: true, userId: true });
