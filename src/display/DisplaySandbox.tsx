import * as React from "react";
import {createEntry, Entry, Stack} from "./stack/models";
import StackDisplay, {IStackDisplayAttributes} from "./StackDisplay";

export function buildDisplaySandbox() {

    const entries: Entry[] = [];
    for(let i = 0; i < 100; i++) {
        const lines = [];
        lines.push(`Line ${i}  foo bar`);
        if(i % 7 == 0) {
            lines.push('  - a');
        }
        entries.push(createEntry(lines));
    }

    let stack = new Stack(entries);

    let displayAttributes: IStackDisplayAttributes = {
        lineHeight: 20,
        topDown: true
    };

    class DisplaySandbox extends React.Component {
        public render(): React.ReactNode {
            return (
                <div>
                    <StackDisplay stack={stack} displayAttributes={displayAttributes}/>
                </div>
            );
        }
    }

    return DisplaySandbox;
}