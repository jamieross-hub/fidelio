import { ERROR_NAMES } from "../constants";
import z from "zod";

// Below are the built-in/library errors.

export const ValidationErrorSchema = z.object({
    name: z.literal(ERROR_NAMES.ValidationError),
    issues: z.array(z.custom<z.core.$ZodIssue>()),
});

export const PrismaClientKnownRequestErrorSchema = z.object({
    name: z.literal(ERROR_NAMES.PrismaClientKnownRequestError),
    message: z.string(),
});

// Below are the custom errors. These are errors we define and throw.

export const InternalServerErrorSchema = z.object({
    name: z.literal(ERROR_NAMES.InternalServerError),
    message: z.string(),
});

export const UnauthorisedErrorSchema = z.object({
    name: z.literal(ERROR_NAMES.UnauthorisedError),
    message: z.string(),
});

export const ForbiddenErrorSchema = z.object({
    name: z.literal(ERROR_NAMES.ForbiddenError),
    message: z.string(),
});
