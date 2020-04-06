import {ApplicationError} from './ApplicationError';
import {ClearInput, SetInput} from "./CommonMessages";
import {StackEntry} from './StackEntry';
import {NOOP, POP, PUSH, USER_ERROR} from './tags';

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
    error: ApplicationError;
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

export function noop(): Noop {
    return {
        type: NOOP
    };
}

export type OutboundMessage = Noop | SetInput | ClearInput | Push | Pop | UserError;
