import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';

import LayoutContainer from './home/layout/layoutContainer';
import { webSocketInitiator } from './common/notifications/socketClient';
import LocationTracking from './locationtracking/locationTracking';
import TreeDataContainer from './home/treeStructures/treeDataContainer';
import VersionControlContainer from './home/treeStructures/versionControlContainer';

webSocketInitiator ();
const history = createHashHistory();

export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <LayoutContainer>
          <Switch>
     		    <Route exact path="/" render={() => (<Redirect to="/load/tree"/>)} />
            {false && <Route exact path="/home" component={LayoutContainer} />}
     		    <Route exact path="/load/tree" component={TreeDataContainer} />
            <Route exact path="/version/control" component={VersionControlContainer} />
            <Route exact path="/location/mine" component={LocationTracking} />
          </Switch>
        </LayoutContainer>
      </Router>
    );
  }
}