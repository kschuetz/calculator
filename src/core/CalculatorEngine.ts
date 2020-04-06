import {InboundMessage} from './models/InboundMessage';
import {NonEmpty} from "./models/NonEmpty";
import {OutboundMessage} from "./models/OutboundMessage";

export interface CalculatorEngine {
    runCommand(command: InboundMessage): Promise<NonEmpty<OutboundMessage>>;
}
