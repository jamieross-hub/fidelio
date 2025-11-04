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
            authorization: z.string(),
        },
        pathPrefix: "/api",
        commonResponses: {
            404: z.object({ message: z.string() }),
            500: z.object({ message: z.string() }),
        },
    }
);
