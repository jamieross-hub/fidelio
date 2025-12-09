import { initContract } from "@ts-rest/core";
import z from "zod";
import { TransactionSchema } from "../../../prisma/generated/zod";
import { CreateTransactionBodySchema, MonthDateSchema, monthNames, MonthSchema, UpdateTransactionBodySchema } from "./types";
import { yearsFromNow } from "../../../src/helpers/dates";

const client = initContract();

export const transactionContract = client.router({
    getTransaction: {
        method: "GET",
        path: "/transactions/:id",
        summary: "Retrieve a single transaction",
        pathParams: z.object({
            id: z.uuidv4(),
        }),
        responses: {
            200: TransactionSchema,
        },
    },
    createTransaction: {
        method: "POST",
        path: "/transactions",
        summary: "Create a new transaction",
        body: CreateTransactionBodySchema,
        responses: {
            200: TransactionSchema,
        },
    },
    updateTransaction: {
        method: "PUT",
        path: "/transactions/:id",
        summary: "Update a transaction",
        pathParams: z.object({
            id: z.uuidv4(),
        }),
        body: UpdateTransactionBodySchema,
        responses: {
            200: TransactionSchema,
        },
    },
    deleteTransaction: {
        method: "DELETE",
        path: "/transactions/:id",
        summary: "Delete a transaction",
        pathParams: z.object({
            id: z.uuidv4(),
        }),
        responses: {
            204: z.undefined(),
        },
    },
    getTransactions: {
        method: "GET",
        path: "/transactions",
        summary: "Retrieve a list of the current user's transactions",
        query: z.object({
            isExpense: z.coerce.boolean().optional(),
        }),
        responses: {
            200: z.array(TransactionSchema),
        },
    },
    getCalendarYear: {
        method: "GET",
        path: "/calendar/:year",
        summary: "Retrieve a list of the current user's transactions for a given year",
        pathParams: z.object({
            year: z.coerce
                .number()
                .min(1900, { error: "Year must be less than 1900" })
                .max(yearsFromNow(1000), { error: `Year must not be greater than ${yearsFromNow(1000)}` }),
        }),
        responses: {
            200: z.array(MonthSchema),
        },
    },
    getCalendarMonth: {
        method: "GET",
        path: "/calendar/:year/:month",
        summary: "Retrieve a list of the current user's transactions for a given year & month",
        pathParams: z.object({
            year: z.coerce
                .number()
                .min(1900, { error: "Year must be less than 1900" })
                .max(yearsFromNow(1000), { error: `Year must not be greater than ${yearsFromNow(1000)}` }),
            month: z.enum(monthNames, { error: `That is not a valid month, must be one of: [${monthNames.join(", ")}]` }),
        }),
        responses: {
            200: z.array(MonthDateSchema),
        },
    },
});
