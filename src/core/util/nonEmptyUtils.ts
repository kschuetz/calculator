import {fromArray, NonEmptyArray} from "fp-ts/es6/NonEmptyArray";
import {Option} from "fp-ts/es6/Option";
import * as Immutable from "immutable";

export function maybeNonEmptyArray<A>(xs?: A[] | Immutable.List<A> | Immutable.Set<A>): Option<NonEmptyArray<A>> {
    if (Immutable.List.isList(xs) || Immutable.Set.isSet(xs)) {
        return fromArray(xs.toArray());
    } else {
        return fromArray(xs as Array<A>);
    }
}
