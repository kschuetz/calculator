import {CalculatorEngine} from "./CalculatorEngine";
import {InputNormalizer} from "./InputNormalizer";
import {InboundMessage} from "./models/InboundMessage";
import {NonEmpty} from "./models/NonEmpty";
import {noop, OutboundMessage} from "./models/OutboundMessage";
import {State} from "./models/State";

// import {SET_INPUT} from "./models/tags";


export class DefaultCalculatorEngine implements CalculatorEngine {

    inputNormalizer: InputNormalizer;
    state: State;

    constructor(inputNormalizer: InputNormalizer) {
        this.state = State.initial();
        this.inputNormalizer = inputNormalizer;
    }

    runCommand(command: InboundMessage): Promise<NonEmpty<OutboundMessage>> {
        return new Promise<NonEmpty<OutboundMessage>>((resolve, reject) => {
            // switch (command.type) {
            //     case SET_INPUT:
            //
            // }
            resolve(NonEmpty.singleton(noop()));
        })
    }

}