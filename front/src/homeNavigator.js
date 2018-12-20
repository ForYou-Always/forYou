import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';

import Login from './entry/loginContainer';
import SignUp from './entry/registrationContainer';

const history = createHashHistory();
export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
   		  <Route exact path="/" render={() => (<Redirect to="/profile" />)} />
          <Route exact path="/home" component={Login} />
          <Route exact path="/profile" component={SignUp} />
        </Switch>
      </Router>
    );
  }
}