import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';


import Checkin from './entry/checkin';
import SignUp from './entry/signup';

const history = createHashHistory();
export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
   		  <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          <Route exact path="/login" component={Checkin} />
          <Route exact path="/register" component={SignUp} />
        </Switch>
      </Router>
    );
  }
}