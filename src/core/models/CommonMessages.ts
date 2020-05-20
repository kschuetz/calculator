import {CLEAR_INPUT, SET_INPUT} from "./tags";

export interface SetInput {
    type: typeof SET_INPUT;
    data: string;
}

export interface ClearInput {
    type: typeof CLEAR_INPUT;
}

export class CommonMessages {
    static setInput(data: string): SetInput {
        return {
            type: SET_INPUT,
            data
        };
    }

    static clearInput(): ClearInput {
        return {
            type: CLEAR_INPUT
        };
    }
}
