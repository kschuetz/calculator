import {MainInputModel} from "./input/models";
import {StackDisplayModel} from "./stack/models";

export class DisplayModel {
    readonly stack: StackDisplayModel;
    readonly input: MainInputModel;

    constructor(stack: StackDisplayModel, input: MainInputModel) {
        this.stack = stack;
        this.input = input;
    }

    modifyStack(f: (prev: StackDisplayModel) => StackDisplayModel): DisplayModel {
        return new DisplayModel(f(this.stack), this.input);
    }

    modifyInput(f: (prev: MainInputModel) => MainInputModel): DisplayModel {
        return new DisplayModel(this.stack, f(this.input));
    }
}