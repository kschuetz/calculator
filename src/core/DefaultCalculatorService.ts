import {Option} from "fp-ts/es6/Option";
import {map as mapOption} from "fp-ts/lib/Option";
import {CalculatorService} from "./CalculatorService";
import {InputNormalizer} from "./InputNormalizer";
import {Action} from "./models/Action";
import {CalculatorState} from "./models/CalculatorState";
import {clearInput, setInput} from "./models/CommonMessages";
import {inputWarning} from "./models/Errors";
import {InputState} from "./models/InputState";
import {UserWarning, userWarning} from "./models/OutboundMessage";
import {OutboundMessages} from "./models/OutboundMessages";
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

    clearInput(): Action<CalculatorState> {
        return Action.modify(state =>
            [OutboundMessages.singleton(clearInput()),
                state.setInput(InputState.empty())]);
    }

    setInput(data: string): Action<CalculatorState> {
        return Action.modify(state => {
            let normalized = this.inputNormalizer.normalizeInput(state, data);
            let newInput = normalized.text;
            return [OutboundMessages.singleton(setInput(newInput))
                .maybeAdd(getInputWarningMessage(normalized)),
                state.setInput(new InputState(newInput))];
        });
    }

    submitInput(): Action<CalculatorState> {
        return Action.noop();
    }

}