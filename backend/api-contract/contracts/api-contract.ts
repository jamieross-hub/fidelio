import z from "zod";
import { userContract } from "./user-contract";
import { transactionContract } from "./transaction-contract";
import { initContract } from "@ts-rest/core";
import { ForbiddenErrorSchema, ValidationErrorSchema } from "../schemas";

const contract = initContract();

export const apiContract = contract.router(
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
            400: ValidationErrorSchema,
            401: ForbiddenErrorSchema,
        },
    }
);
