import {CalculatorService} from "./CalculatorService";
import {InputNormalizer} from "./InputNormalizer";
import {Action} from "./models/Action";
import {CalculatorState} from "./models/CalculatorState";
import {clearInput, setInput} from "./models/CommonMessages";
import {InputState} from "./models/InputState";
import {OutboundMessages} from "./models/OutboundMessages";


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
            let normalized = data;
            return [OutboundMessages.singleton(setInput(normalized)),
                state.setInput(new InputState(normalized))];
        });
    }

    submitInput(): Action<CalculatorState> {
        return Action.noop();
    }

}