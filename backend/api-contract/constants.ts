import type { FirstLastDayOfMonthChoices, RecurrenceTypeChoices, MonthName } from "./types";

// All possible error names must come from this enum first. This is the single source of truth.
export const ErrorNameEnum = {
    ValidationError: "ValidationError",
    PrismaClientKnownRequestError: "PrismaClientKnownRequestError",
    InternalServerError: "InternalServerError",
    UnauthorisedError: "UnauthorisedError",
    ForbiddenError: "ForbiddenError",
} as const;

export const monthNames: MonthName[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

export const recurrenceTypeChoices: RecurrenceTypeChoices[] = ["day", "week", "month"];

export const firstLastDayOfMonthChoices: FirstLastDayOfMonthChoices[] = ["first_business", "last_business", "last", "specific"];
