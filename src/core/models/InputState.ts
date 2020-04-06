export class InputState {
    readonly data: string;

    constructor(data: string) {
        this.data = data;
    }

    static empty(): InputState {
        return new InputState('');
    }
}
