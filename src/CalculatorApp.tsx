import * as React from "react";
import {useState} from "react";
import {Card} from "rebass";
import {CalculatorService} from "./core/CalculatorService";
import {CalculatorSession} from "./core/CalculatorSession";
import {DefaultInputNormalizer} from "./core/DefaultInputNormalizer";
import {DefaultInputValidator} from "./core/DefaultInputValidator";
import {InputNormalizer} from "./core/InputNormalizer";
import {InputValidator} from "./core/InputValidator";
import {MainInput, MainInputDisplayAttributes} from "./display/input/MainInput";
import {MainInputModel} from "./display/input/models";
import {DisplayModel} from "./display/models";
import {StackDisplayModel} from "./display/stack/models";
import StackDisplay, {StackDisplayAttributes} from "./display/stack/StackDisplay";

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
                // // const normalized = filterInput(newValue);
                //
                // const prevValue = displayModel.input.text;
                // if (normalized !== prevValue) {
                //     let newModel = displayModel.modifyInput(im => im.withText(normalized));
                //     setDisplayModel(newModel);
                // }
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