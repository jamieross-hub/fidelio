import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authenticateJWT } from "@/shared/middleware/jwt";
import {
    errorLogger,
    handle500Errors,
    handleCustomErrors,
    handlePrismaErrors,
    handleZodValidationErrors,
} from "@/shared/middleware/errors";
import { createExpressEndpoints } from "@ts-rest/express";
import { apiContract } from "@api-contract";
import { router } from "./shared/router";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());
app.use(authenticateJWT);

createExpressEndpoints(apiContract, router, app, {
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
