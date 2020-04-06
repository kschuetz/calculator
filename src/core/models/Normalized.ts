import {ErrorList} from "./ErrorList";

export const ACCEPTED = 'ACCEPTED';
export const REJECTED = 'REJECTED';

export interface Accepted<A> {
    readonly type: typeof ACCEPTED;
    readonly normalized: A;
}

export interface Rejected<A> {
    readonly type: typeof REJECTED;
    readonly errors: ErrorList;
}

export function accepted<A>(normalized: A): Accepted<A> {
    return {
        type: ACCEPTED,
        normalized
    };
}

export function rejected<A>(errors: ErrorList): Rejected<A> {
    return {
        type: REJECTED,
        errors
    }
}

export type Normalized<A> = Accepted<A> | Rejected<A>;
