import {NonEmptyArray} from "fp-ts/lib/NonEmptyArray";
import {ClearInput, SetInput} from "./CommonMessages";
import {ApplicationError, ApplicationWarning, INPUT_WARNING, InputWarning} from './Errors';
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

export type OutboundMessage = Noop | SetInput | ClearInput | Push | Pop | UserError | ProgramError |
    UserWarning;

export class OutboundMessages {
    static push(entry: StackEntry): Push {
        return {
            type: PUSH,
            entry
        };
    }

    static pop(count: number): Pop {
        return {
            type: POP,
            count
        };
    }

    static programError(error: Error): ProgramError {
        return {
            type: PROGRAM_ERROR,
            error
        };
    }

    static noop(): Noop {
        return {
            type: NOOP
        };
    }

    static userWarning(warnings: NonEmptyArray<ApplicationWarning>): UserWarning {
        return {
            type: USER_WARNING,
            warnings
        };
    }

    static inputWarning(message: string): InputWarning {
        return {
            type: INPUT_WARNING,
            message
        }
    }
}
