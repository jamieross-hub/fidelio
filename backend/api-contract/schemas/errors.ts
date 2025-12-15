import { ErrorNameEnum } from "../constants";
import z from "zod";

// Below are the built-in/library errors.

export const ValidationErrorSchema = z.object({
    name: z.literal(ErrorNameEnum.ValidationError),
    issues: z.array(z.custom<z.core.$ZodIssue>()),
});

export const PrismaClientKnownRequestErrorSchema = z.object({
    name: z.literal(ErrorNameEnum.PrismaClientKnownRequestError),
    message: z.string(),
});

// Below are the custom errors. These are errors we define and throw.

export const InternalServerErrorSchema = z.object({
    name: z.literal(ErrorNameEnum.InternalServerError),
    message: z.string(),
});

export const UnauthorisedErrorSchema = z.object({
    name: z.literal(ErrorNameEnum.UnauthorisedError),
    message: z.string(),
});

export const ForbiddenErrorSchema = z.object({
    name: z.literal(ErrorNameEnum.ForbiddenError),
    message: z.string(),
});
