import {InputNormalizer} from "./InputNormalizer";
import {InputEnvironment} from "./models/InputEnvironment";
import {accepted, Normalized} from "./models/Normalized";

function isDigit(c: string): boolean {
    let cc = c.charCodeAt(0);
    return cc >= 48 && cc < 58;
}

function filterDigits(incoming: string): string {
    return incoming.split('').filter(isDigit).join('');
}

export class DefaultInputNormalizer implements InputNormalizer {
    normalizeInput(environment: InputEnvironment, text: string): Normalized<string> {
        return accepted(filterDigits(text));
    }
}