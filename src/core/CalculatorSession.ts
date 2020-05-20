import {InboundMessage} from './models/InboundMessage';
import {OutboundMessageList} from "./models/OutboundMessageList";

export interface CalculatorSession {
    runCommand(command: InboundMessage): Promise<OutboundMessageList>;
}
