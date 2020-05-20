import * as React from "react";
import {useState} from "react";
import {Card} from "rebass";
import {CalculatorService} from "../core/CalculatorService";
import {CalculatorSession} from "../core/CalculatorSession";
import {DefaultCalculatorService} from "../core/DefaultCalculatorService";
import {DefaultCalculatorSession} from "../core/DefaultCalculatorSession";
import {DefaultInputNormalizer} from "../core/DefaultInputNormalizer";
import {DefaultInputValidator} from "../core/DefaultInputValidator";
import {InputNormalizer} from "../core/InputNormalizer";
import {InputValidator} from "../core/InputValidator";
import {CommonMessages} from "../core/models/CommonMessages";
import {combine, failure, failures, success, Validated} from "../core/validation/Validated";
import {MainInput, MainInputDisplayAttributes} from "./input/MainInput";
import {MainInputModel} from "./input/models";
import {DisplayModel} from "./models";
import {createEntry, Entry, StackDisplayModel} from "./stack/models";
import StackDisplay, {StackDisplayAttributes} from "./stack/StackDisplay";

function doThings() {
    let combiner = (([a, b]: [string, string]) => a + "," + b);
    let message1: Validated<string> = combine([
            failure("foo"),
            failures(["bar", "baz"]),
            success("123"),
            success("456")
        ],
        combiner);
    console.log(message1);

    let message2: Validated<string> = combine([
            success("abc"),
            success("def")],
        combiner
    );

    console.log(message2);
}

export function buildDisplaySandbox() {

    const inputNormalizer: InputNormalizer = new DefaultInputNormalizer();
    const inputValidator: InputValidator = new DefaultInputValidator(inputNormalizer);
    const calculatorService: CalculatorService = new DefaultCalculatorService(inputNormalizer, inputValidator);
    const calculatorSession: CalculatorSession = new DefaultCalculatorSession(calculatorService);

    calculatorSession.runCommand(CommonMessages.clearInput());

    doThings();

    const entries: Entry[] = [];
    for (let i = 0; i < 100; i++) {
        const lines = [];
        lines.push(`Line ${i}  foo bar`);
        if (i % 7 == 0) {
            lines.push('  - a');
        }
        entries.push(createEntry(lines));
    }

    let initialStackDisplayModel = new StackDisplayModel(entries);

    let initialMainInputModel = new MainInputModel("123");

    let displayAttributes: StackDisplayAttributes & MainInputDisplayAttributes = {
        lineHeight: 1.1,
        topDown: true
    };

    function isDigit(c: string): boolean {
        let cc = c.charCodeAt(0);
        return cc >= 48 && cc < 58;
    }

    function filterInput(incoming: string): string {
        return incoming.split('').filter(isDigit).join('');
    }

    let initialModel = new DisplayModel(initialStackDisplayModel, initialMainInputModel);

    function DisplaySandbox() {
        const [model, setModel] = useState(initialModel);

        const eventHandlers = {
            mainInputKeyDown(event: React.KeyboardEvent): void {
                console.log('in Sandbox2.mainInputKeyDown');
                console.log(event);
            },

            mainInputKeyPress(): void {

            },

            mainInputKeyUp(): void {

            },

            mainInputChange(newValue: string): void {
                const normalized = filterInput(newValue);

                const prevValue = model.input.text;
                if (normalized !== prevValue) {
                    let newModel = model.modifyInput(im => im.withText(normalized));
                    setModel(newModel);
                }
            }
        };

        return (
            <div className={"DisplayRoot"}>
                <Card width={800} /*className="DisplayRoot"*/>
                    <MainInput model={model.input}
                               displayAttributes={displayAttributes}
                               eventHandlers={eventHandlers}/>
                    <StackDisplay stack={model.stack} displayAttributes={displayAttributes}/>
                </Card>
            </div>
        );
    }

    return DisplaySandbox;
}