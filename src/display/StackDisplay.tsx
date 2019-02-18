import {ReactNode} from "react";
import * as React from "react";
import {Entry, Stack} from "./stack/models";
import './Display.css';

export interface IStackDisplayAttributes {
    lineHeight: number;
    topDown: boolean;
}

export interface IStackDisplayProps {
    stack: Stack;
    displayAttributes: IStackDisplayAttributes;
}

interface IStackGutterCellProps {
    lineNumber: number;
    entry: Entry,
    displayAttributes: IStackDisplayAttributes;
}

class StackGutterCell extends React.Component<IStackGutterCellProps, any> {
    public render() {
        const height = this.props.displayAttributes.lineHeight * this.props.entry.lineCount;
        return (
            <div className="StackDisplay-gutter-cell" style={{height: `${height}px`}}>
                <span className="StackDisplay-gutter-line-number">{this.props.lineNumber}</span>
                <span className="StackDisplay-gutter-separator">:</span>
            </div>);
    }
}

class StackDisplayGutter extends React.Component<IStackDisplayProps, any> {
    public render() {
        const displayAttributes = this.props.displayAttributes;
        let lineNumber = 1;
        let children: ReactNode[] = [];
        // TODO: handle bottom up
        this.props.stack.entries.forEach(entry => {
            children.push(<StackGutterCell key={lineNumber} lineNumber={lineNumber} entry={entry}
                                           displayAttributes={displayAttributes}/>);
            lineNumber += 1;
        });
        return (
            <div className="StackDisplay-gutter">
                {children}
            </div>
        )
    }
}

interface IStackDisplayContentLine {
    text: string;
    displayAttributes: IStackDisplayAttributes;
}

class StackDisplayContentLine extends React.Component<IStackDisplayContentLine, any> {
    public render() {
        let height = this.props.displayAttributes.lineHeight;
        return (
            <div className="StackDisplay-content-line" style={{height: `${height}px`}}>
                {this.props.text}
            </div>
        )
    }
}

interface IStackDisplayEntry {
    entry: Entry;
    displayAttributes: IStackDisplayAttributes;
}

class StackDisplayEntry extends React.Component<IStackDisplayEntry, any> {
    public render() {
        const entry = this.props.entry;
        let displayAttributes = this.props.displayAttributes;
        const height = displayAttributes.lineHeight * entry.lineCount;
        let children: ReactNode[] = [];

        for (let lineNumber = 0; lineNumber < entry.lineCount; lineNumber++) {
            children.push(<StackDisplayContentLine key={lineNumber}
                                                   text={entry.lines(lineNumber)}
                                                   displayAttributes={displayAttributes}/>);
        }
        return (
            <div className="StackDisplay-entry" style={{height: `${height}px`}}>
                {children}
            </div>
        );
    };
}


class StackDisplayScroller extends React.Component<IStackDisplayProps, any> {
    public render() {
        let displayAttributes = this.props.displayAttributes;
        let lineNumber = 1;
        let children: ReactNode[] = [];
        this.props.stack.entries.forEach(entry => {
            children.push(<StackDisplayEntry key={lineNumber}
                                             entry={entry}
                                             displayAttributes={displayAttributes}/>);
            lineNumber += 1;
        });
        return (
            <div className="StackDisplay-scroller">
                {children}
            </div>
        )
    }
}

class StackDisplay extends React.Component<IStackDisplayProps, any> {
    public render() {
        return (
            <div className="StackDisplay">
                <StackDisplayGutter stack={this.props.stack} displayAttributes={this.props.displayAttributes}/>
                <StackDisplayScroller stack={this.props.stack} displayAttributes={this.props.displayAttributes}/>
            </div>
        );
    }
}

export default StackDisplay;
