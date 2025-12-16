import { type NextFunction, Request, Response } from "express";
import type {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "../../../prisma/generated/internal/prismaNamespace";
import { ForbiddenError, UnauthorisedError } from "@api-contract";

export type WithOptionalCode<T> = T & { code?: string };

export type ErrorMiddlewareFunction<T> = (error: T, request: Request, response: Response, next: NextFunction) => void;

export type PrismaError =
    | WithOptionalCode<PrismaClientKnownRequestError>
    | WithOptionalCode<PrismaClientUnknownRequestError>
    | WithOptionalCode<PrismaClientRustPanicError>
    | WithOptionalCode<PrismaClientInitializationError>
    | WithOptionalCode<PrismaClientValidationError>;

export type CustomError = ForbiddenError | UnauthorisedError;
