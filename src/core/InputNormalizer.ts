import {InputEnvironment} from "./models/InputEnvironment";
import {Normalized} from "./models/Normalized";

export interface InputNormalizer {
    normalizeInput(environment: InputEnvironment, text: string): Normalized<string>;
}
