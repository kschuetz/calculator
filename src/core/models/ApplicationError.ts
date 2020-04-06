export const INPUT_ERROR = 'INPUT_ERROR';

export interface InputError {
    type: typeof INPUT_ERROR;
    message: string;
}

export type ApplicationError = InputError;
