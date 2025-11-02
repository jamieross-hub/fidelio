import express from "express";
import type { Express, Request, Response } from "express";
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
import { initServer } from "@ts-rest/express";
import { userContract } from "@api-contract/contracts/users/user-contract";
import { transactionContract } from "@api-contract/contracts/transactions/transaction-contract";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());
app.use(authenticateJWT);

const server = initServer();

server.router(userContract, {
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
});

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
