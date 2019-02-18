import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {buildDisplaySandbox} from "./display/DisplaySandbox";
import registerServiceWorker from './registerServiceWorker';

import {Attributes, TextFragment} from './display/models';
import {createEntry} from "./display/stack/models";

const DisplaySandbox = buildDisplaySandbox();

ReactDOM.render(
    <React.Fragment>
        <App/>
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
