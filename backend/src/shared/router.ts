import { transactionRouter } from "@/features/transactions/routes";
import { userRouter } from "@/features/users";
import { apiContract } from "@api-contract";
import { initServer } from "@ts-rest/express";

const server = initServer();

export const router = server.router(apiContract, {
    users: userRouter,
    transactions: transactionRouter,
});
