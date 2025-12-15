import z from "zod";
import {
    ForbiddenErrorSchema,
    InternalServerErrorSchema,
    PrismaClientKnownRequestErrorSchema,
    UnauthorisedErrorSchema,
    ValidationErrorSchema,
} from "../schemas";

export type ValidationErrorSchemaType = z.infer<typeof ValidationErrorSchema>;

export type PrismaClientKnownRequestErrorSchemaType = z.infer<typeof PrismaClientKnownRequestErrorSchema>;

export type InternalServerErrorSchemaType = z.infer<typeof InternalServerErrorSchema>;

export type UnauthorisedErrorSchemaType = z.infer<typeof UnauthorisedErrorSchema>;

export type ForbiddenErrorSchemaType = z.infer<typeof ForbiddenErrorSchema>;
