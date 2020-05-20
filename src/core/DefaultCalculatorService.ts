import {Option} from "fp-ts/es6/Option";
import {map as mapOption} from "fp-ts/lib/Option";
import {CalculatorService} from "./CalculatorService";
import {InputNormalizer} from "./InputNormalizer";
import {Action} from "./models/Action";
import {CalculatorAction, compound, sendMessage, setInputState} from "./models/CalculatorActions";
import {clearInput, setInput} from "./models/CommonMessages";
import {inputWarning} from "./models/Errors";
import {InputState} from "./models/InputState";
import {UserWarning, userWarning} from "./models/OutboundMessage";
import {maybeNonEmptyArray} from "./util/nonEmptyUtils";
import {NormalizedInput} from "./validation/NormalizedInput";


function getInputWarningMessage(normalized: NormalizedInput): Option<UserWarning> {
    return mapOption(userWarning)(maybeNonEmptyArray(normalized.warnings.map(inputWarning)));
}

export class DefaultCalculatorService implements CalculatorService {
    inputNormalizer: InputNormalizer;

    constructor(inputNormalizer: InputNormalizer) {
        this.inputNormalizer = inputNormalizer;
    }

    clearInput(): CalculatorAction {
        return setInputState(InputState.empty())
            .andThen(sendMessage(clearInput()));
    }

    setInput(data: string): CalculatorAction {
        return compound(state => {
            let normalized = this.inputNormalizer.normalizeInput(state, data);
            let newInput = normalized.text;
            return setInputState(new InputState(newInput))
                .andThen(sendMessage(setInput(newInput)))
                .andThenMaybe(getInputWarningMessage(normalized), sendMessage);
        });
    }

    submitInput(): CalculatorAction {
        return Action.noop();
    }

}