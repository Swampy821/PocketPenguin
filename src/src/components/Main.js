require('normalize.css/normalize.css');
require('styles/App.css');
require("styles/Details.css");

import React from 'react';
import { Router, Route, Link, browserHistory } from "react-router"
import Home from "./Home";
import Details from "./Details/Details";

class AppComponent extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/slot/:id" component={Details} />
      </Router>
    )
  }



}


export default AppComponent;
