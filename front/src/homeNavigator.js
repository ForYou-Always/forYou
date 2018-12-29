import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';

import MainLayout from './home/mainLayout';
import LayoutContainer from './home/layoutContainer';

const history = createHashHistory();
export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
   		  <Route exact path="/" render={() => (<Redirect to="/home"/>)} />
          <Route exact path="/home" component={LayoutContainer} />
        </Switch>
      </Router>
    );
  }
}