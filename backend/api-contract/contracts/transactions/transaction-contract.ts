import { initContract } from "@ts-rest/core";
import z from "zod";
import { TransactionSchema } from "../../../prisma/generated/zod";
import { yearsFromNow } from "@/helpers/dates";
import { CreateTransactionBodySchema, MonthDateSchema, monthNames, MonthSchema } from "./types";

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
    createTransaction: {
        method: "POST",
        path: "/transactions",
        summary: "Create a new transaction",
        body: CreateTransactionBodySchema,
        responses: {
            200: TransactionSchema,
        },
    },
    getTransactionsForYear: {
        method: "GET",
        path: "/transactions/:year",
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
    getTransactionsForMonth: {
        method: "GET",
        path: "/transactions/:year/:month",
        summary: "Retrieve a list of the current user's transactions for a given year & month",
        pathParams: z.object({
            year: z.coerce
                .number()
                .min(1900, { error: "Year must be less than 1900" })
                .max(yearsFromNow(1000), { error: `Year must not be greater than ${yearsFromNow(1000)}` }),
            month: z.enum(monthNames, { error: `That is not a valid month, must be one of: [${monthNames.join(", ")}]` }),
        }),
        responses: {
            200: MonthDateSchema,
        },
    },
});
