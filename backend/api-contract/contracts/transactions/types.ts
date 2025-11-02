import z from "zod";
import { Transaction } from "../../../prisma/generated";

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

const monthNames: MonthName[] = [
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

export interface MonthSerializer {
    monthName: MonthName;
    income: number;
    expenses: number;
    remaining: number;
}

export interface MonthDate {
    date: string;
    transactions: Transaction[];
}

export const MonthSchema = z.object({
    monthName: z.enum(monthNames),
    income: z.number(),
    expenses: z.number(),
    remaining: z.number(),
});
