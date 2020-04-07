import {Either, fold, left, right} from "fp-ts/lib/Either";
import {NonEmptyArray} from "fp-ts/lib/NonEmptyArray";
import {ErrorList} from "./ErrorList";


export function combine<A, B>(vs: NonEmptyArray<Validated<A>>,
                              f: (items: NonEmptyArray<A>) => B): Validated<B> {
    let errorList: ErrorList | undefined = undefined;
    let successes: NonEmptyArray<A> | undefined = undefined;
    let failed = false;
    vs.forEach((v: Validated<A>) =>
        fold((es: ErrorList) => {
                failed = true;
                if (!errorList) {
                    errorList = es;
                } else {
                    errorList = errorList.concat(es);
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
        return <Validated<B>>left(errorList);
    } else {
        return success(f(<NonEmptyArray<A>><unknown>successes));
    }
}

export function success<A>(value: A): Validated<A> {
    return right(value);
}

export function failures<A>(errors: NonEmptyArray<string> | ErrorList): Validated<A> {
    if (errors instanceof ErrorList) {
        return left(<ErrorList>errors);
    } else {
        return left(ErrorList.errorList(errors));
    }
}

export function failure<A>(error: string): Validated<A> {
    return left(ErrorList.singleError(error));
}

export type Validated<A> = Either<ErrorList, A>
