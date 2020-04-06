import {History} from './History';
import {InputState} from "./InputState";
import {Mode} from "./Mode";
import {StackState} from "./StackState";

export class State {

    readonly input: InputState;
    readonly mode: Mode;
    readonly stack: StackState;
    readonly history: History<State>;

    constructor(input: InputState, mode: Mode, stack: StackState, history: History<State>) {
        this.input = input;
        this.stack = stack;
        this.mode = mode;
        this.history = history;
    }

    modifyInput(f: (prev: InputState) => InputState) {
        return new State(f(this.input), this.mode, this.stack, this.history);
    }

    modifyMode(f: (prev: Mode) => Mode) {
        return new State(this.input, f(this.mode), this.stack, this.history);
    }

    modifyStack(f: (prev: StackState) => StackState) {
        return new State(this.input, this.mode, f(this.stack), this.history);
    }

    static initial(): State {
        return new State(InputState.empty(), Mode.default(), StackState.empty(), History.empty());
    }
}

