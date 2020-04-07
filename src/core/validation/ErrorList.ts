import {concat, NonEmptyArray} from "fp-ts/lib/NonEmptyArray";

export class ErrorList {
    readonly errors: NonEmptyArray<string>;

    private constructor(errors: NonEmptyArray<string>) {
        this.errors = errors;
    }

    concat(other: ErrorList): ErrorList {
        return new ErrorList(concat(this.errors, other.errors));
    }

    static singleError(error: string): ErrorList {
        return new ErrorList([error]);
    }

    static errorList(errors: NonEmptyArray<string>): ErrorList {
        return new ErrorList(errors);
    }
}