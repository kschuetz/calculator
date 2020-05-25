import {Option} from "fp-ts/es6/Option";
import {Either, fold as foldEither} from "fp-ts/lib/Either";
import {map as mapOption} from "fp-ts/lib/Option";
import {InputNormalizer} from "./InputNormalizer";
import {InputValidator} from "./InputValidator";
import {
    CalculatorAction,
    clearInputState,
    compound,
    noop,
    pushToStack,
    sendMessage,
    setInputState
} from "./models/CalculatorActions";
import {CommonMessages} from "./models/CommonMessages";
import {InputState} from "./models/InputState";
import {OutboundMessages, UserWarning} from "./models/OutboundMessage";
import {StackEntry} from "./models/StackEntry";
import {maybeNonEmptyArray} from "./util/nonEmptyUtils";
import {ErrorList} from "./validation/ErrorList";
import {NormalizedInput} from "./validation/NormalizedInput";


function getInputWarningMessage(normalized: NormalizedInput): Option<UserWarning> {
    return mapOption(OutboundMessages.userWarning)(maybeNonEmptyArray(normalized.warnings.map(OutboundMessages.inputWarning)));
}

export class CalculatorService {
    inputNormalizer: InputNormalizer;
    inputValidator: InputValidator;

    constructor(inputNormalizer: InputNormalizer, inputValidator: InputValidator) {
        this.inputNormalizer = inputNormalizer;
        this.inputValidator = inputValidator;
    }

    clearInput(): CalculatorAction {
        return clearInputState.andThen(sendMessage(CommonMessages.clearInput()));
    }

    setInput(data: string): CalculatorAction {
        return compound(state => CalculatorService.setNormalizedInput(this.inputNormalizer.normalizeInput(state, data)));
    }

    submitInput(): CalculatorAction {
        return compound(state => {
            let validated: Either<ErrorList, StackEntry> = this.inputValidator.validateInput(state, state.input.data);
            return foldEither((errors: ErrorList) => CalculatorService.sendInputErrors(errors),
                (stackEntry: StackEntry) =>
                    pushToStack(stackEntry)
                        .andThen(clearInputState)
                        .andThen(sendMessage(OutboundMessages.push(stackEntry)))
                        .andThen(sendMessage(CommonMessages.clearInput())))(validated);
        });
    }

    private static setNormalizedInput(normalized: NormalizedInput): CalculatorAction {
        let newInput = normalized.text;
        return setInputState(new InputState(newInput))
            .andThen(sendMessage(CommonMessages.setInput(newInput)))
            .andThenMaybe(getInputWarningMessage(normalized), sendMessage);
    }

    private static sendInputErrors(errorList: ErrorList): CalculatorAction {
        // TODO
        return noop();
    }
}