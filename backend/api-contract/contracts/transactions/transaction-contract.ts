import { initContract } from "@ts-rest/core";
import z from "zod";
import { TransactionSchema } from "../../../prisma/generated/zod";
import { yearsFromNow } from "@/helpers/dates";
import { MonthDateSchema, monthNames, MonthSchema } from "./types";

const client = initContract();

export const transactionContract = client.router({
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
        summary: "Retrieve a list of the current user's transactions for a given year",
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
