import { initContract } from "@ts-rest/core";
import z from "zod";

const client = initContract();

// All possible error names must come from this enum first. This is the single source of truth.
export const enum ErrorNameEnum {
    ValidationError = "ValidationError",
    PrismaClientKnownRequestError = "PrismaClientKnownRequestError",
    InternalServerError = "InternalServerError",
    UnauthorisedError = "UnauthorisedError",
    ForbiddenError = "ForbiddenError",
}

// Below are the built-in/library errors.

const validationError = client.type<{
    name: ErrorNameEnum.ValidationError;
    issues: z.core.$ZodIssue[];
}>();

const prismaClientKnownRequestError = client.type<{
    name: ErrorNameEnum.PrismaClientKnownRequestError;
    message: string;
}>();

// Below are the custom errors. These are errors we define and throw.

export class UnauthorisedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ErrorNameEnum.UnauthorisedError;
    }
}

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ErrorNameEnum.ForbiddenError;
    }
}

const internalServerError = client.type<{
    name: ErrorNameEnum.InternalServerError;
    message: string;
}>();

const unauthorisedError = client.type<{
    name: ErrorNameEnum.UnauthorisedError;
    message: string;
}>();

const forbiddenError = client.type<{
    name: ErrorNameEnum.ForbiddenError;
    message: string;
}>();

export const commonErrorType = client.type<
    | typeof validationError
    | typeof prismaClientKnownRequestError
    | typeof internalServerError
    | typeof unauthorisedError
    | typeof forbiddenError
>();

// Custom ZodErrors. Useful for throwing custom ts-rest RequestValidationErrors

export const EmailTaken = new z.ZodError([
    {
        code: "custom",
        path: ["email"],
        message: "Email is already taken",
    },
]);
