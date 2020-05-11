import {NonEmptyArray} from "fp-ts/lib/NonEmptyArray";
import {ClearInput, SetInput} from "./CommonMessages";
import {ApplicationError, ApplicationWarning} from './Errors';
import {StackEntry} from './StackEntry';
import {NOOP, POP, PROGRAM_ERROR, PUSH, USER_ERROR, USER_WARNING} from './tags';

export interface Noop {
    type: typeof NOOP;
}

export interface Push {
    type: typeof PUSH;
    entry: StackEntry;
}

export interface Pop {
    type: typeof POP;
    count: number;
}

export interface UserError {
    type: typeof USER_ERROR;
    errors: NonEmptyArray<ApplicationError>;
}

export interface ProgramError {
    type: typeof PROGRAM_ERROR;
    error: Error;
}

export interface UserWarning {
    type: typeof USER_WARNING;
    warnings: NonEmptyArray<ApplicationWarning>;
}


export function push(entry: StackEntry): Push {
    return {
        type: PUSH,
        entry
    };
}

export function pop(count: number): Pop {
    return {
        type: POP,
        count
    };
}

export function programError(error: Error): ProgramError {
    return {
        type: PROGRAM_ERROR,
        error
    };
}

export function noop(): Noop {
    return {
        type: NOOP
    };
}

export function userWarning(warnings: NonEmptyArray<ApplicationWarning>): UserWarning {
    return {
        type: USER_WARNING,
        warnings
    };
}

export type OutboundMessage = Noop | SetInput | ClearInput | Push | Pop | UserError | ProgramError |
    UserWarning;
