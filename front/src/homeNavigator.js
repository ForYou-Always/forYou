import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';
import NewsFeedScreen from './home/layout/newsfeed/news-feed-screen'

import LayoutContainer from './home/layout/layoutContainer';

const history = createHashHistory();
export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <LayoutContainer>
          <Switch>
     		    <Route exact path="/" render={() => (<Redirect to="/home"/>)} />
            <Route exact path="/newsFeed" component={NewsFeedScreen}/>
            {false && <Route exact path="/home" component={LayoutContainer} />}
          </Switch>
        </LayoutContainer>
      </Router>
    );
  }
}