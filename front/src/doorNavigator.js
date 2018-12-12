import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';

import Login from './entry/loginContainer';
import SignUp from './entry/registrationContainer';

const history = createHashHistory();
export default class EntryNavigator extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
   		  <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          {false && <Route exact path="/forgot-password" component={ForgotPassword} />}
          {false && <Route exact path="/reset-password" component={ResetPassword} />}
          {false && <Route exact path="/feedback" component={Feedback} />}
        </Switch>
      </Router>
    );
  }
}