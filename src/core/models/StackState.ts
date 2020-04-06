import * as Immutable from 'immutable';
import {StackEntry} from "./StackEntry";

export class StackState {
    readonly entries: Immutable.List<StackEntry>;

    constructor(entries: Immutable.List<StackEntry>) {
        this.entries = entries;
    }

    static empty(): StackState {
        return new StackState(Immutable.List());
    }
}
