import * as Immutable from 'immutable';
import {StackEntry} from "./StackEntry";

export class StackState {
    readonly entries: Immutable.Stack<StackEntry>;

    constructor(entries: Immutable.Stack<StackEntry>) {
        this.entries = entries;
    }

    push(...entries: Array<StackEntry>): StackState {
        return new StackState(this.entries.push(...entries));
    }

    static empty(): StackState {
        return new StackState(Immutable.Stack());
    }
}
