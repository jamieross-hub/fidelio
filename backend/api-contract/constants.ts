import type { FirstLastDayOfMonthChoices, RecurrenceTypeChoices, MonthName } from "./types";

// All possible error names must come from this enum first. This is the single source of truth.
export const ERROR_NAMES = {
    ValidationError: "ValidationError",
    PrismaClientKnownRequestError: "PrismaClientKnownRequestError",
    InternalServerError: "InternalServerError",
    UnauthorisedError: "UnauthorisedError",
    ForbiddenError: "ForbiddenError",
} as const;

export const MONTH_NAMES: MonthName[] = [
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

export const RECURRENCE_TYPE_CHOICES: RecurrenceTypeChoices[] = ["day", "week", "month"];

export const FIRST_LAST_DAY_OF_MONTH_CHOICES: FirstLastDayOfMonthChoices[] = ["first_business", "last_business", "last", "specific"];
