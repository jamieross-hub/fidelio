import { ErrorNameEnum } from "../constants";

// These are the classes for our API errors to be used when throwing custom errors

export class InternalServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ErrorNameEnum.InternalServerError;
    }
}

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
