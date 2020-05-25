import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {buildCalculatorApp} from "./CalculatorApp";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const CalculatorApp = buildCalculatorApp();

ReactDOM.render(
    <React.Fragment>
        <CalculatorApp/>
    </React.Fragment>,

    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
