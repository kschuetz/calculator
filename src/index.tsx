import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import {buildDisplaySandbox} from "./display/DisplaySandbox";
import registerServiceWorker from './registerServiceWorker';

import {Attributes, TextFragment} from './display/spike/models';
import {createEntry} from "./display/stack/models";

const DisplaySandbox = buildDisplaySandbox();

ReactDOM.render(
    <React.Fragment>
        <DisplaySandbox/>
    </React.Fragment>,

    document.getElementById('root') as HTMLElement
);
registerServiceWorker();

console.log(Attributes);
console.log(TextFragment);

console.log(createEntry("foo"));
console.log(createEntry());
console.log(createEntry(["foo", "bar", "baz"]));
