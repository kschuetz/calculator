export class InputState {
    readonly data: string;

    constructor(data: string) {
        if (!data) {
            data = '';
        }
        this.data = data;
    }

    isEmpty() {
        return this.data === '';
    }

    static empty(): InputState {
        return new InputState('');
    }
}
