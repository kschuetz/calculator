import * as React from "react";
import {useState} from "react";
import {Card} from "rebass";
import {CalculatorService} from "./core/CalculatorService";
import {CalculatorSession} from "./core/CalculatorSession";
import {DefaultInputNormalizer} from "./core/DefaultInputNormalizer";
import {DefaultInputValidator} from "./core/DefaultInputValidator";
import {InputNormalizer} from "./core/InputNormalizer";
import {InputValidator} from "./core/InputValidator";
import {CommonMessages} from "./core/models/CommonMessages";
import {InboundMessage, submitInput} from "./core/models/InboundMessage";
import {OutboundMessage} from "./core/models/OutboundMessage";
import {OutboundMessageList} from "./core/models/OutboundMessageList";
import {StackEntry} from "./core/models/StackEntry";
import {CLEAR_INPUT, PUSH, SET_INPUT} from "./core/models/tags";
import {MainInput, MainInputDisplayAttributes} from "./display/input/MainInput";
import {MainInputModel} from "./display/input/models";
import {DisplayModel} from "./display/models";
import {createEntry, Entry, StackDisplayModel} from "./display/stack/models";
import StackDisplay, {StackDisplayAttributes} from "./display/stack/StackDisplay";

function convertStackEntry(input: StackEntry): Entry {
    return createEntry(input.value.data.toString());
}

function applyMessage(message: OutboundMessage, model: DisplayModel): DisplayModel {
    switch (message.type) {
        case CLEAR_INPUT:
            return model.modifyInput(m => m.withText(""));
        case SET_INPUT:
            return model.modifyInput(m => m.withText(message.data));
        case PUSH:
            return model.modifyStack(s => s.push(convertStackEntry(message.entry)));
        default:
            return model;
    }
}

function applyMessages(messageList: OutboundMessageList, model: DisplayModel): DisplayModel {
    return messageList.items.reduce((acc, message) => applyMessage(message, acc), model);
}

export function buildCalculatorApp() {
    const inputNormalizer: InputNormalizer = new DefaultInputNormalizer();
    const inputValidator: InputValidator = new DefaultInputValidator(inputNormalizer);
    const calculatorService: CalculatorService = new CalculatorService(inputNormalizer, inputValidator);
    const calculatorSession: CalculatorSession = new CalculatorSession(calculatorService);

    let initialStackDisplayModel = new StackDisplayModel();

    let initialMainInputModel = new MainInputModel("");

    let displayAttributes: StackDisplayAttributes & MainInputDisplayAttributes = {
        lineHeight: 1.1,
        topDown: true
    };

    let initialDisplayModel = new DisplayModel(initialStackDisplayModel, initialMainInputModel);


    function CalculatorApp() {
        const [displayModel, setDisplayModel] = useState(initialDisplayModel);

        function runCommand(command: InboundMessage): void {
            calculatorSession.runCommand(command)
                .then(messageList => setDisplayModel(applyMessages(messageList, displayModel)));
        }

        const eventHandlers = {
            mainInputKeyDown(event: React.KeyboardEvent): void {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    runCommand(submitInput());
                }
            },

            mainInputKeyPress(): void {
            },

            mainInputKeyUp(): void {

            },

            mainInputChange(newValue: string): void {
                runCommand(CommonMessages.setInput(newValue));
            }
        };

        return (
            <div className={"DisplayRoot"}>
                <Card width={800} /*className="DisplayRoot"*/>
                    <MainInput model={displayModel.input}
                               displayAttributes={displayAttributes}
                               eventHandlers={eventHandlers}/>
                    <StackDisplay stack={displayModel.stack} displayAttributes={displayAttributes}/>
                </Card>
            </div>
        );
    }

    return CalculatorApp;
}