import {History} from './History';
import {InputState} from "./InputState";
import {Mode} from "./Mode";
import {StackState} from "./StackState";

export class CalculatorState {

    readonly input: InputState;
    readonly mode: Mode;
    readonly stack: StackState;
    readonly history: History<CalculatorState>;

    constructor(input: InputState, mode: Mode, stack: StackState, history: History<CalculatorState>) {
        this.input = input;
        this.stack = stack;
        this.mode = mode;
        this.history = history;
    }

    modifyInput(f: (prev: InputState) => InputState) {
        return new CalculatorState(f(this.input), this.mode, this.stack, this.history);
    }

    modifyMode(f: (prev: Mode) => Mode) {
        return new CalculatorState(this.input, f(this.mode), this.stack, this.history);
    }

    modifyStack(f: (prev: StackState) => StackState) {
        return new CalculatorState(this.input, this.mode, f(this.stack), this.history);
    }

    setInput(input: InputState) {
        return new CalculatorState(input, this.mode, this.stack, this.history);
    }

    static initial(): CalculatorState {
        return new CalculatorState(InputState.empty(), Mode.default(), StackState.empty(), History.empty());
    }
}

