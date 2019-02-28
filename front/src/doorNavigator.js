import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';

import Login from './entry/loginContainer';
import SignUp from './entry/registrationContainer';
import ForgotPassword from './entry/forgotPasswordContainer';
import ResetPassword from './entry/resetPasswordContainer';
import TestingContainer from './entry/testingContainer';

const history = createHashHistory();
export default class EntryNavigator extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
   		  <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/testing" component={TestingContainer} />
          {false && <Route exact path="/feedback" component={Feedback} />}
        </Switch>
      </Router>
    );
  }
}