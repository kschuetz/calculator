export const INPUT_ERROR = 'INPUT_ERROR';
export const INPUT_WARNING = 'INPUT_WARNING';

export interface InputError {
    type: typeof INPUT_ERROR;
    message: string;
}

export type ApplicationError = InputError;

export interface InputWarning {
    type: typeof INPUT_WARNING;
    message: string;
}

export function inputWarning(message: string): InputWarning {
    return {
        type: INPUT_WARNING,
        message
    }
}

export type ApplicationWarning = InputWarning;