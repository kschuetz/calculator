import {right} from "fp-ts/lib/Either";
import {InputNormalizer} from "./InputNormalizer";
import {InputValidator} from "./InputValidator";
import {InputEnvironment} from "./models/InputEnvironment";
import {StackEntry} from "./models/StackEntry";
import {Validated} from "./validation/Validated";

export class DefaultInputValidator implements InputValidator {
    inputNormalizer: InputNormalizer;

    constructor(inputNormalizer: InputNormalizer) {
        this.inputNormalizer = inputNormalizer;
    }

    validateInput(environment: InputEnvironment, input: string): Validated<StackEntry> {
        let normalizedInput = this.inputNormalizer.normalizeInput(environment, input);
        return right({value: {data: normalizedInput.text}});
    }
}