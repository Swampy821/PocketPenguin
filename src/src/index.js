import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
