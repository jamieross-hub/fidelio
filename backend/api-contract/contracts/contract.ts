import z from "zod";
import { userContract } from "./users/user-contract";
import { transactionContract } from "./transactions/transaction-contract";
import { initContract } from "@ts-rest/core";

const client = initContract();

export const contract = client.router(
    {
        users: userContract,
        transactions: transactionContract,
    },
    {
        baseHeaders: {
            Authorization: z.string(),
        },
        pathPrefix: "/api",
        commonResponses: {
            404: client.type<{ message: string }>(),
            500: client.type<{ message: string }>(),
        },
    }
);
