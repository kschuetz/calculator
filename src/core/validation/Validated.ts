import {Either, fold, left, right} from "fp-ts/lib/Either";
import {concat, NonEmptyArray} from "fp-ts/lib/NonEmptyArray";


export function combine<A, B>(vs: NonEmptyArray<Validated<A>>,
                              f: (items: NonEmptyArray<A>) => B): Validated<B> {
    let errors: NonEmptyArray<string> | undefined = undefined;
    let successes: NonEmptyArray<A> | undefined = undefined;
    let failed = false;
    vs.forEach((v: Validated<A>) =>
        fold((es: NonEmptyArray<string>) => {
                failed = true;
                if (!errors) {
                    errors = es;
                } else {
                    errors = concat(errors, es);
                }
            },
            (a: A) => {
                if (!failed) {
                    if (!successes) {
                        successes = [a];
                    } else {
                        successes.push(a);
                    }
                }
            })(v));
    if (failed) {
        return <Validated<B>>left(errors);
    } else {
        return success(f(<NonEmptyArray<A>><unknown>successes));
    }
}

export function success<A>(value: A): Validated<A> {
    return right(value);
}

export function failures<A>(errors: NonEmptyArray<string>): Validated<A> {
    return left(errors);
}

export function failure<A>(error: string): Validated<A> {
    return left([error]);
}

export type Validated<A> = Either<NonEmptyArray<string>, A>
