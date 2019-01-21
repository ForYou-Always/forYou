import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';

import LayoutContainer from './home/layout/layoutContainer';
import { webSocketInitiator } from './common/notifications/socketClient';

webSocketInitiator ();
const history = createHashHistory();

export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <LayoutContainer>
          <Switch>
     		    <Route exact path="/" render={() => (<Redirect to="/home"/>)} />
            {false && <Route exact path="/home" component={LayoutContainer} />}
          </Switch>
        </LayoutContainer>
      </Router>
    );
  }
}