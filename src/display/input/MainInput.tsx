import {ChangeEvent, KeyboardEvent} from "react";
import * as React from "react";
import {MainInputModel} from "./models";

export interface MainInputDisplayAttributes {

}

export interface MainInputEvents {
    mainInputKeyDown(event: KeyboardEvent): void;
    mainInputKeyPress(): void;
    mainInputKeyUp(): void;
    mainInputChange(newValue: string): void;
}

export interface MainInputProps {
    readonly model: MainInputModel;
    readonly displayAttributes: MainInputDisplayAttributes;
    readonly eventHandlers: MainInputEvents;
}

export class MainInput extends React.Component<MainInputProps, any> {
    public render() {
        return (<div className="MainInput-container">
            <input className="MainInput-inner"
                   type="text"
                   value={this.props.model.text}
                   onChange={this.handleChange}
                   onKeyDown={this.handleKeyDown}/>
        </div>);
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.eventHandlers.mainInputChange(event.target.value);
    };

    handleKeyDown = (event: KeyboardEvent) => {
        this.props.eventHandlers.mainInputKeyDown(event);
    }
}
