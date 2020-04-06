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

function StackGutterCell(props: StackGutterCellProps) {
    const height = props.displayAttributes.lineHeight * props.entry.lineCount;
    return (
        <div className="StackDisplay-gutter-cell" style={{height: heightUnits(height)}}>
            <span className="StackDisplay-gutter-line-number">{props.lineNumber}</span>
            <span className="StackDisplay-gutter-separator">:</span>
        </div>);

}

function StackDisplayGutter(props: StackDisplayProps) {
    const displayAttributes = props.displayAttributes;
    let lineNumber = 1;
    let children: ReactNode[] = [];
    // TODO: handle bottom up
    props.stack.entries.forEach(entry => {
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

interface StackDisplayContentLineProps {
    text: string;
    displayAttributes: StackDisplayAttributes;
}

function StackDisplayContentLine(props: StackDisplayContentLineProps) {
    let height = props.displayAttributes.lineHeight;
    return (
        <div className="StackDisplay-content-line" style={{height: heightUnits(height)}}>
            {props.text}
        </div>
    )
}

interface StackDisplayEntryProps {
    entry: Entry;
    displayAttributes: StackDisplayAttributes;
}

function StackDisplayEntry(props: StackDisplayEntryProps) {
    const entry = props.entry;
    let displayAttributes = props.displayAttributes;
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
}

function StackDisplayScroller(props: StackDisplayProps) {
    let displayAttributes = props.displayAttributes;
    let lineNumber = 1;
    let children: ReactNode[] = [];
    props.stack.entries.forEach(entry => {
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

function StackDisplay(props: StackDisplayProps) {
    return (
        <div className="StackDisplay">
            <StackDisplayGutter stack={props.stack} displayAttributes={props.displayAttributes}/>
            <StackDisplayScroller stack={props.stack} displayAttributes={props.displayAttributes}/>
        </div>
    );
}

export default StackDisplay;
