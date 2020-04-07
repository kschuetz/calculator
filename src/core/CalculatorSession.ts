import {InboundMessage} from './models/InboundMessage';
import {OutboundMessages} from "./models/OutboundMessages";

export interface CalculatorSession {
    runCommand(command: InboundMessage): Promise<OutboundMessages>;
}
