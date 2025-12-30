import z from "zod";
import { CreateTransactionBodySchema, MonthDateSchema, MonthSchema, UpdateTransactionBodySchema } from "../schemas";
import { FIRST_LAST_DAY_OF_MONTH_CHOICES, MONTH_NAMES, RECURRENCE_TYPE_CHOICES } from "@api-contract/constants";

export type MonthName = (typeof MONTH_NAMES)[number];

export type RecurrenceTypeChoices = (typeof RECURRENCE_TYPE_CHOICES)[number];

export type FirstLastDayOfMonthChoices = (typeof FIRST_LAST_DAY_OF_MONTH_CHOICES)[number];

export type MonthSchemaType = z.infer<typeof MonthSchema>;

export type MonthDateSchemaType = z.infer<typeof MonthDateSchema>;

export type CreateTransactionBodySchemaType = z.infer<typeof CreateTransactionBodySchema>;

export type UpdateTransactionBodySchemaType = z.infer<typeof UpdateTransactionBodySchema>;
