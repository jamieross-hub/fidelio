import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authenticateJWT } from "./jwt/jwt";
import { handleCustomErrors } from "./errors/middleware";
import {
    getMonthData,
    getUserData,
    getYearData,
    postNewTransaction,
    getTransactionList,
    deleteTransaction,
    getTransaction,
    updateTransaction,
} from "./controllers/controllers";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { contract } from "@api-contract";
import {
    createNewTransaction,
    deleteSingleTransaction,
    getAllTransactions,
    getSingleTransaction,
    updateSingleTransaction,
} from "./models/models";

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
            return {
                status: 200,
                body: {
                    msg: "Your JWT is valid",
                },
            };
        },
        getUser: async ({ req }) => {
            return {
                status: 200,
                body: req.user!,
            };
        },
    },
    transactions: {
        getTransaction: async ({ req: { user }, params: { id } }) => {
            const transaction = await getSingleTransaction(id, user.id);
            return transaction ? { status: 200, body: transaction } : { status: 404, body: { message: "Transaction not found" } };
        },
        createTransaction: async ({ req: { user }, body }) => {
            return {
                status: 200,
                body: await createNewTransaction(body, user.id),
            };
        },
        updateTransaction: async ({ req: { user }, body, params: { id } }) => {
            const transaction = await updateSingleTransaction(body, id, user.id);
            return { status: 200, body: transaction };
        },
        deleteTransaction: async ({ req: { user }, params: { id } }) => {
            await deleteSingleTransaction(id, user.id);
            return { status: 204, body: undefined };
        },
        getTransactions: async ({ req: { user } }) => {
            return {
                status: 200,
                body: await getAllTransactions(user.id),
            };
        },
    },
});

createExpressEndpoints(contract, router, app);

// app.get("/api/validateJWT", (_request: Request, response: Response) => {
//     response.status(200).send({ msg: "Your JWT is valid" });
// });

// app.get("/api/user", getUserData);

// app.get("/api/transactions/:year", getYearData);

// app.get("/api/transactions/:year/:month", getMonthData);

// app.post("/api/transactions", postNewTransaction);
// app.get("/api/transactions", getTransactionList);

// app.get("/api/transactions/:id", getTransaction);
// app.put("/api/transactions/:id", updateTransaction);
// app.delete("/api/transactions/:id", deleteTransaction);

app.use(handleCustomErrors);

app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
