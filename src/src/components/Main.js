require('normalize.css/normalize.css');
require('styles/App.css');
require("styles/Details.css");

import React from 'react';
import { Router, Route, Link, browserHistory } from "react-router"
import Home from "./Home";
import Details from "./Details/Details";
import Parties from "./Parties/Parties";
import MyCalendar from "./MyCalendar/MyCalendar";
import Login from "./Login";
import Register from './Register';

class AppComponent extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/slot/:id" component={Details} />
        <Route path="/calendar/:id" component={MyCalendar} />
        <Route path="/parties" component={Parties} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    )
  }



}


export default AppComponent;
