
export class MainInputModel {
    readonly text: string;

    constructor(text?: string) {
        this.text = text || '';
    }

    // noinspection JSMethodCanBeStatic
    withText(newText: string): MainInputModel {
        return new MainInputModel(newText);
    }
}
