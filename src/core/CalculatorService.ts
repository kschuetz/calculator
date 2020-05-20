import {CalculatorAction} from "./models/CalculatorActions";


export interface CalculatorService {
    setInput(data: string): CalculatorAction;

    submitInput(): CalculatorAction;

    clearInput(): CalculatorAction;
}
