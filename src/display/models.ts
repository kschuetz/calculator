import * as Immutable from "immutable";

export type Style = string;

export class Attributes {
    readonly styles: Immutable.Set<Style>;

    constructor(styles?: Style[] | Immutable.List<Style> | Immutable.Set<Style>) {
        this.styles = Immutable.Set(styles || []);
    }

    addStyle(style: Style): Attributes {
        return new Attributes(this.styles.add(style));
    }

    removeStyle(style: Style): Attributes {
        return new Attributes(this.styles.remove(style));
    }

    static default: Attributes = new Attributes();
}

export interface Fragment {
    readonly width: number;
    readonly attributes: Attributes;
}

export class TextFragment implements Fragment {
    readonly text: string;
    readonly attributes: Attributes;

    get width(): number {
        return this.text.length;
    }

    constructor(text: string, attributes?: Attributes) {
        this.text = text;
        this.attributes = attributes || Attributes.default;
    }

    withText(newText: string): TextFragment {
        return new TextFragment(newText, this.attributes);
    }

    withAttributes(newAttributes: Attributes): TextFragment {
        return new TextFragment(this.text, newAttributes);
    }
}

export class SpacingFragment implements Fragment {
    readonly width: number;
    readonly attributes: Attributes;

    constructor(width: number, attributes?: Attributes) {
        this.width = width;
        this.attributes = attributes || Attributes.default;
    }

    withWidth(newWidth: number): SpacingFragment {
        return new SpacingFragment(newWidth, this.attributes);
    }

}

export class Line {
    fragments: Immutable.List<Fragment>;

    constructor(fragments?: Fragment[] | Immutable.List<Fragment>) {
        this.fragments = Immutable.List(fragments || []);
    }

    static empty: Line = new Line();

    static build(f: (builder: LineBuilder) => void, initialAttributes?: Attributes) {
        let builder = new LineBuilder(initialAttributes);
        f(builder);
        return builder.build();
    }
}

export class LineBuilder {
    private spaceCount: number;
    private text: string;
    private attributes: Attributes;
    private fragments: Array<Fragment>;

    constructor(initialAttributes?: Attributes) {
        this.spaceCount = 0;
        this.text = '';
        this.attributes = initialAttributes || Attributes.default;
        this.fragments = [];
    }

    setAttributes(attributes: Attributes): this {
        this.flush();
        this.attributes = attributes;
        return this;
    }

    modifyAttributes(f: (attribs: Attributes) => Attributes): this {
        const newAttributes = f(this.attributes);
        return this.setAttributes(newAttributes);
    }

    addText(text: string): this {
        return this;
    }

    addSpace(width: number) {
        if(width > 0) {
            this.spaceCount += width;
        }
    }

    build(): Line {
        this.flush();
        return new Line(this.fragments);
    }

    private flush(): void {
        if(this.spaceCount > 0) {
            this.fragments.push(new SpacingFragment(this.spaceCount, this.attributes));
        }
        if(this.text !== '') {
            this.fragments.push(new TextFragment(this.text, this.attributes));
        }
    }
}
