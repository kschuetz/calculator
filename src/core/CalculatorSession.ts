import {CalculatorService} from "./CalculatorService";
import {Action} from "./models/Action";
import {CalculatorState} from "./models/CalculatorState";
import {InboundMessage} from "./models/InboundMessage";
import {OutboundMessages} from "./models/OutboundMessage";
import {OutboundMessageList} from "./models/OutboundMessageList";
import {CLEAR_INPUT, SET_INPUT, SUBMIT_INPUT} from "./models/tags";

// import {SET_INPUT} from "./models/tags";


export class CalculatorSession {
    calculatorService: CalculatorService;
    state: CalculatorState;

    constructor(calculatorService: CalculatorService) {
        this.state = CalculatorState.initial();
        this.calculatorService = calculatorService;
    }

    runCommand(command: InboundMessage): Promise<OutboundMessageList> {
        let messageType = command.type;
        switch (command.type) {
            case SET_INPUT:
                return this.runAction(this.calculatorService.setInput(command.data));
            case CLEAR_INPUT:
                return this.runAction(this.calculatorService.clearInput());
            case SUBMIT_INPUT:
                return this.runAction(this.calculatorService.submitInput());
            default:
                return Promise.resolve(OutboundMessageList.singleton(OutboundMessages.programError(new Error("unrecognized message type: " + messageType))));
        }
    }

    private runAction(action: Action<CalculatorState>): Promise<OutboundMessageList> {
        const self = this;
        return action.run(this.state)
            .then(([result, newState]) => {
                self.state = newState;
                return result;
            });
    }

}
