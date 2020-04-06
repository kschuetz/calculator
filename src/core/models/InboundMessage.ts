import {ClearInput, SetInput} from "./CommonMessages";
import {SUBMIT_INPUT} from "./tags";

export interface SubmitInput {
    type: typeof SUBMIT_INPUT;
}

export function submitInput(): SubmitInput {
    return {
        type: SUBMIT_INPUT
    };
}

export type InboundMessage = SetInput | ClearInput | SubmitInput;