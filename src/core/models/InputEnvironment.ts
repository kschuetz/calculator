import {InputState} from "./InputState";
import {Mode} from "./Mode";
import {StackState} from "./StackState";

export interface InputEnvironment {
    readonly mode: Mode;
    readonly input: InputState;
    readonly stack: StackState;
}
