import z from "zod";
import { CreateTransactionBodySchema, MonthDateSchema, MonthSchema, UpdateTransactionBodySchema } from "../schemas";

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

export type RecurrenceTypeChoices = "day" | "week" | "month";

export type FirstLastDayOfMonthChoices = "first_business" | "last_business" | "last" | "specific";

export type MonthSchemaType = z.infer<typeof MonthSchema>;

export type MonthDateSchemaType = z.infer<typeof MonthDateSchema>;

export type CreateTransactionBodySchemaType = z.infer<typeof CreateTransactionBodySchema>;

export type UpdateTransactionBodySchemaType = z.infer<typeof UpdateTransactionBodySchema>;
