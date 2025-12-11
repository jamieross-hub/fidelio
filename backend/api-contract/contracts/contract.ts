import z from "zod";
import { userContract } from "./users/user-contract";
import { transactionContract } from "./transactions/transaction-contract";
import { initContract } from "@ts-rest/core";
import { commonErrorType } from "../errors";

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
            400: commonErrorType,
            401: commonErrorType,
            403: commonErrorType,
            500: commonErrorType,
        },
    }
);
