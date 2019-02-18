import * as Immutable from 'immutable';

export interface Entry {
    readonly lineCount: number;
    lines(index: number): string;
}

class SimpleEntry implements Entry {
    readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    get lineCount(): number {
        return 1;
    };

    lines(index: number): string {
        return this.text;
    }

    static default: SimpleEntry = new SimpleEntry('');
}

class MultiLineEntry implements Entry {
    readonly text: Immutable.List<string>;

    constructor(lines?: string[] | Immutable.List<string>) {
        this.text = Immutable.List(lines || []);
    }

    get lineCount(): number {
        return this.text.size;
    }

    lines(index: number): string {
        return this.text.get(index) || "";
    }
}

export class Stack {
    readonly entries: Immutable.Stack<Entry>;

    constructor(entries?: Entry[] | Immutable.List<Entry> | Immutable.Stack<Entry>) {
        this.entries = Immutable.Stack(entries || []);
    }

    modify(f: (prev: Immutable.Stack<Entry>) => Immutable.Stack<Entry>): Stack {
        return new Stack(f(this.entries));
    }
}

export function createEntry(lines?: string | string[] | Immutable.List<string>): Entry {
    if(!lines) {
        return SimpleEntry.default;
    } else if(typeof lines === 'string') {
        return new SimpleEntry(lines);
    } else if (Array.isArray(lines)) {
        if(lines.length === 0) {
            return SimpleEntry.default;
        } else if(lines.length === 1) {
            return createEntry(lines[0]);
        } else {
            return new MultiLineEntry(lines);
        }
    } else {
        if(lines.size === 0) {
            return SimpleEntry.default;
        } else if(lines.size === 1) {
            return createEntry(lines.get(0));
        } else {
            return new MultiLineEntry(lines);
        }
    }
}
