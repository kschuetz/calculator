import {ReactNode} from "react";
import * as React from "react";
import {Entry, StackDisplayModel} from "./models";
import '../Display.css';

export interface StackDisplayAttributes {
    lineHeight: number;
    topDown: boolean;
}

export interface StackDisplayProps {
    stack: StackDisplayModel;
    displayAttributes: StackDisplayAttributes;
}

interface StackGutterCellProps {
    lineNumber: number;
    entry: Entry,
    displayAttributes: StackDisplayAttributes;
}

function heightUnits(height: number) {
    return `${height}em`;
}

class StackGutterCell extends React.Component<StackGutterCellProps, any> {
    public render() {
        const height = this.props.displayAttributes.lineHeight * this.props.entry.lineCount;
        return (
            <div className="StackDisplay-gutter-cell" style={{height: heightUnits(height)}}>
                <span className="StackDisplay-gutter-line-number">{this.props.lineNumber}</span>
                <span className="StackDisplay-gutter-separator">:</span>
            </div>);
    }
}

class StackDisplayGutter extends React.Component<StackDisplayProps, any> {
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

interface StackDisplayContentLineProps {
    text: string;
    displayAttributes: StackDisplayAttributes;
}

class StackDisplayContentLine extends React.Component<StackDisplayContentLineProps, any> {
    public render() {
        let height = this.props.displayAttributes.lineHeight;
        return (
            <div className="StackDisplay-content-line" style={{height: heightUnits(height)}}>
                {this.props.text}
            </div>
        )
    }
}

interface StackDisplayEntryProps {
    entry: Entry;
    displayAttributes: StackDisplayAttributes;
}

class StackDisplayEntry extends React.Component<StackDisplayEntryProps, any> {
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
            <div className="StackDisplay-entry" style={{height: heightUnits(height)}}>
                {children}
            </div>
        );
    };
}


class StackDisplayScroller extends React.Component<StackDisplayProps, any> {
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

class StackDisplay extends React.Component<StackDisplayProps, any> {
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
