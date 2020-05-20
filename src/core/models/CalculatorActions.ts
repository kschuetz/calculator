import {Action} from "./Action";
import {CalculatorState} from "./CalculatorState";
import {InputState} from "./InputState";
import {OutboundMessage} from "./OutboundMessage";
import {OutboundMessages} from "./OutboundMessages";

export type CalculatorAction = Action<CalculatorState>;

export const compound: (f: (incoming: CalculatorState) => CalculatorAction) => CalculatorAction = Action.compound;
export const messagesFromState: (f: (incoming: CalculatorState) => OutboundMessages) => CalculatorAction = Action.messagesFromState;
export const messageFromState: (f: (incoming: CalculatorState) => OutboundMessage) => CalculatorAction = Action.messageFromState;
export const modifyState: (f: (incoming: CalculatorState) => CalculatorState) => CalculatorAction = Action.modifyState;
export const sendMessages: (messages: OutboundMessages) => CalculatorAction = Action.sendMessages;
export const sendMessage: (message: OutboundMessage) => CalculatorAction = Action.sendMessage;
export const asyncMessagesFromState: (f: (incoming: CalculatorState) => Promise<OutboundMessages>) => CalculatorAction = Action.asyncMessagesFromState;
export const asyncMessageFromState: (f: (incoming: CalculatorState) => Promise<OutboundMessage>) => CalculatorAction = Action.asyncMessageFromState;
export const asyncModifyState: (f: (incoming: CalculatorState) => Promise<CalculatorState>) => CalculatorAction = Action.asyncModifyState;
export const noop: () => CalculatorAction = Action.noop;

export function setInputState(inputState: InputState): CalculatorAction {
    return modifyState(state => state.setInput(inputState));
}
