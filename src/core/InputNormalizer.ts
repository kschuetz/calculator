import {InputEnvironment} from "./models/InputEnvironment";
import {Validated} from "./validation/Validated";

export interface InputNormalizer {
    normalizeInput(environment: InputEnvironment, text: string): Validated<string>;
}
