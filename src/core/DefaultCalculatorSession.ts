import {CalculatorService} from "./CalculatorService";
import {CalculatorSession} from "./CalculatorSession";
import {Action} from "./models/Action";
import {CalculatorState} from "./models/CalculatorState";
import {InboundMessage} from "./models/InboundMessage";
import {programError} from "./models/OutboundMessage";
import {OutboundMessages} from "./models/OutboundMessages";

// import {SET_INPUT} from "./models/tags";


export class DefaultCalculatorSession implements CalculatorSession {

    calculatorService: CalculatorService;
    state: CalculatorState;

    constructor(calculatorService: CalculatorService) {
        this.state = CalculatorState.initial();
        this.calculatorService = calculatorService;
    }

    runCommand(command: InboundMessage): Promise<OutboundMessages> {
        let messageType = command.type;
        switch (command.type) {
            case "SET_INPUT":
                return this.runAction(this.calculatorService.setInput(command.data));
            case "CLEAR_INPUT":
                return this.runAction(this.calculatorService.clearInput());
            case "SUBMIT_INPUT":
                return this.runAction(this.calculatorService.submitInput());
            default:
                return Promise.resolve(OutboundMessages.singleton(programError(new Error("unrecognized message type: " + messageType))));
        }
    }

    private runAction(action: Action<CalculatorState>): Promise<OutboundMessages> {
        const self = this;
        return action.run(this.state)
            .then(([result, newState]) => {
                self.state = newState;
                return result;
            });
    }

}
