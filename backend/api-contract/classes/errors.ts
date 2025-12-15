import { ERROR_NAMES } from "../constants";

// These are the classes for our API errors to be used when throwing custom errors

export class InternalServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ERROR_NAMES.InternalServerError;
    }
}

export class UnauthorisedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ERROR_NAMES.UnauthorisedError;
    }
}

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ERROR_NAMES.ForbiddenError;
    }
}
