import { NextFunction, Response, Request } from "express";
import { RequestValidationError } from "@ts-rest/express";
import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "../../prisma/generated/internal/prismaNamespace.js";
import { ERROR_NAMES, ForbiddenError, UnauthorisedError } from "@api-contract";

type WithOptionalCode<T> = T & { code?: string };

type ErrorMiddlewareFunction<T> = (error: T, request: Request, response: Response, next: NextFunction) => void;

export const errorLogger: ErrorMiddlewareFunction<Error> = (error, _request, _response, next) => {
    next(error);
};

export const handleZodValidationErrors: ErrorMiddlewareFunction<RequestValidationError> = (error, _request, response, next) => {
    if (error.body) {
        const { issues } = error.body;
        response.status(400).json({ name: ERROR_NAMES.ValidationError, issues });
    } else {
        next(error);
    }
};

type PrismaError =
    | WithOptionalCode<PrismaClientKnownRequestError>
    | WithOptionalCode<PrismaClientUnknownRequestError>
    | WithOptionalCode<PrismaClientRustPanicError>
    | WithOptionalCode<PrismaClientInitializationError>
    | WithOptionalCode<PrismaClientValidationError>;

export const handlePrismaErrors: ErrorMiddlewareFunction<PrismaError> = (error, _request, response, next) => {
    if (error instanceof PrismaClientKnownRequestError) {
        const { code } = error;

        switch (code) {
            case "P2025":
                response.status(404).send({
                    name: ERROR_NAMES.PrismaClientKnownRequestError,
                    message: `No ${(error.meta?.modelName as string).toLowerCase()} matching those details`,
                });
                break;
            case "P2002":
                response.status(400).send({
                    name: ERROR_NAMES.PrismaClientKnownRequestError,
                    message: `This ${(error.meta?.modelName as string).toLowerCase()} already exists`,
                });
                break;
        }
    } else {
        next(error);
    }
};

type CustomError = ForbiddenError | UnauthorisedError;

export const handleCustomErrors: ErrorMiddlewareFunction<CustomError> = (error, _request, response, next) => {
    console.error(error instanceof UnauthorisedError, "hfhfh");

    if (error instanceof UnauthorisedError) {
        response.status(401).send({
            name: ERROR_NAMES.UnauthorisedError,
            message: error?.message || "The request could not be authorised",
        });
    } else {
        next(error);
    }
};

export const handle500Errors = (_error: Error, _request: Request, response: Response) => {
    response.status(500).send({ name: ERROR_NAMES.InternalServerError, message: "Internal server error" });
};
