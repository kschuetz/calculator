import * as Immutable from "immutable";

export class NormalizedInput {
    readonly text: string;
    readonly warnings: Immutable.List<string>;

    constructor(text: string, warnings: Immutable.List<string>) {
        this.text = text;
        this.warnings = warnings;
    }

    addWarning(warning: string): NormalizedInput {
        return new NormalizedInput(this.text, this.warnings.push(warning));
    }
}

export function normalizedInput(text: string): NormalizedInput {
    return new NormalizedInput(text, Immutable.List());
}
