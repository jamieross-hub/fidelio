import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authenticateJWT } from "@/jwt/jwt";
import { errorLogger, handle500Errors, handleCustomErrors, handlePrismaErrors, handleZodValidationErrors } from "@/errors/middleware";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { contract } from "@api-contract";
import {
    createNewTransaction,
    deleteSingleTransaction,
    getAllTransactions,
    getMonthTransactions,
    getSingleTransaction,
    getYearTransactions,
    updateSingleTransaction,
} from "./models/models";
import { monthNames } from "@api-contract/contracts/transactions/types";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());
app.use(authenticateJWT);

const server = initServer();

const router = server.router(contract, {
    users: {
        validateJWT: async () => {
            return { status: 200, body: { msg: "Your JWT is valid" } };
        },
        getUser: async ({ req }) => {
            return { status: 200, body: req.user! };
        },
    },
    transactions: {
        getTransaction: async ({ req: { user }, params: { id } }) => {
            const transaction = await getSingleTransaction(id, user.id);
            return transaction ? { status: 200, body: transaction } : { status: 404, body: { message: "Transaction not found" } };
        },
        createTransaction: async ({ req: { user }, body }) => {
            return { status: 200, body: await createNewTransaction(body, user.id) };
        },
        updateTransaction: async ({ req: { user }, body, params: { id } }) => {
            return { status: 200, body: await updateSingleTransaction(body, id, user.id) };
        },
        deleteTransaction: async ({ req: { user }, params: { id } }) => {
            await deleteSingleTransaction(id, user.id);
            return { status: 204, body: undefined };
        },
        getTransactions: async ({ req: { user } }) => {
            return { status: 200, body: await getAllTransactions(user.id) };
        },
        getCalendarYear: async ({ req: { user }, params: { year } }) => {
            return { status: 200, body: await getYearTransactions(year, user.id) };
        },
        getCalendarMonth: async ({ req: { user }, params: { year, month } }) => {
            return { status: 200, body: await getMonthTransactions(year, monthNames.indexOf(month), user.id) };
        },
    },
});

createExpressEndpoints(contract, router, app, {
    // Just passes on the error to the middleware stack. This is only invoked when the error is thrown by Zod inside the ts-rest router, otherwise the normal middleware flow occurs
    requestValidationErrorHandler: (error, _request, _response, next) => next(error),
});

// error-handling middleware
app.use(errorLogger);
app.use(handleZodValidationErrors);
app.use(handlePrismaErrors);
app.use(handleCustomErrors);
app.use(handle500Errors);

app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
