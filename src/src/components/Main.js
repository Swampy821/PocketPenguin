require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from "./Home"

class AppComponent extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
      </Router>
    )
  }



}


export default AppComponent;
