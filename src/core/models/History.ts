import * as Immutable from 'immutable';
import {HistoryEntry} from "./HistoryEntry";

export class History<A> {
    private readonly _entries: Immutable.List<HistoryEntry<A>>;

    constructor(entries: Immutable.List<HistoryEntry<A>>) {
        this._entries = entries;
    }

    get entries(): Immutable.List<HistoryEntry<A>> {
        return this._entries;
    }

    static empty<A>(): History<A> {
        return new History<A>(Immutable.List());
    }
}
