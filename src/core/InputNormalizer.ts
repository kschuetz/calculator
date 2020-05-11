import {InputEnvironment} from "./models/InputEnvironment";
import {NormalizedInput} from "./validation/NormalizedInput";

export interface InputNormalizer {
    normalizeInput(environment: InputEnvironment, text: string): NormalizedInput;
}
