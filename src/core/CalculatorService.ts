import {Action} from "./models/Action";
import {CalculatorState} from "./models/CalculatorState";


export interface CalculatorService {
    setInput(data: string): Action<CalculatorState>;

    submitInput(): Action<CalculatorState>;

    clearInput(): Action<CalculatorState>;
}
