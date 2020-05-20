import {InputEnvironment} from "./models/InputEnvironment";
import {StackEntry} from "./models/StackEntry";
import {Validated} from "./validation/Validated";

export interface InputValidator {
    validateInput(environment: InputEnvironment, input: string): Validated<StackEntry>
}