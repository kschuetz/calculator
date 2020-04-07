import {InputNormalizer} from "./InputNormalizer";
import {InputEnvironment} from "./models/InputEnvironment";
import {success, Validated} from "./validation/Validated";

function isDigit(c: string): boolean {
    let cc = c.charCodeAt(0);
    return cc >= 48 && cc < 58;
}

function filterDigits(incoming: string): string {
    return incoming.split('').filter(isDigit).join('');
}

export class DefaultInputNormalizer implements InputNormalizer {
    normalizeInput(environment: InputEnvironment, text: string): Validated<string> {
        return success(filterDigits(text));
    }
}