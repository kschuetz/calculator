import * as React from "react";
import {Card} from "rebass";
import {MainInput, MainInputDisplayAttributes, MainInputEvents} from "./input/MainInput";
import {MainInputModel} from "./input/models";
import {DisplayModel} from "./models";
import {createEntry, Entry, StackDisplayModel} from "./stack/models";
import StackDisplay, {StackDisplayAttributes} from "./stack/StackDisplay";

export function buildDisplaySandbox() {

    const entries: Entry[] = [];
    for (let i = 0; i < 100; i++) {
        const lines = [];
        lines.push(`Line ${i}  foo bar`);
        if (i % 7 == 0) {
            lines.push('  - a');
        }
        entries.push(createEntry(lines));
    }

    let initialStackDisplayModel = new StackDisplayModel(entries);

    let initialMainInputModel = new MainInputModel("123");

    let displayAttributes: StackDisplayAttributes & MainInputDisplayAttributes = {
        lineHeight: 1.1,
        topDown: true
    };

    function isDigit(c: string): boolean {
        let cc = c.charCodeAt(0);
        return cc >= 48 && cc < 58;
    }

    function filterInput(incoming: string): string {
        return incoming.split('').filter(isDigit).join('');
    }

    const initialState = {model: new DisplayModel(initialStackDisplayModel, initialMainInputModel)};

    type State = Readonly<typeof initialState>;

    class DisplaySandbox extends React.Component<any, State> implements MainInputEvents {


        constructor(props: Readonly<any>) {
            super(props);
            this.state = initialState;
        }

        public render(): React.ReactNode {
            const model = this.state.model;
            return (
                <Card width={300} className="DisplayRoot">
                    <MainInput model={model.input}
                               displayAttributes={displayAttributes}
                               eventHandlers={this}/>
                    <StackDisplay stack={model.stack} displayAttributes={displayAttributes}/>
                </Card>
            );
        }

        mainInputKeyDown(event: React.KeyboardEvent): void {
            console.log('in mainInputKeyDown');
            console.log(event);
        }

        mainInputKeyPress(): void {

        }

        mainInputKeyUp(): void {

        }

        mainInputChange(newValue: string): void {
            const normalized = filterInput(newValue);

            const prevValue = this.state.model.input.text;
            if(normalized !== prevValue) {
                console.log('current state', this.state);
                let newModel = this.state.model.modifyInput(im => im.withText(normalized));
                const newState = {model: newModel};
                console.log('new state', newState);
                this.setState(newState);
            }
        }


    }

    return DisplaySandbox;
}