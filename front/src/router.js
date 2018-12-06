import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';


import Checkin from './entry/checkin';
import SignUp from './entry/signup';
import NewsFeed from './news-feed/news-feed';

const history = createHashHistory();
export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
   		  <Route exact path="/" render={() => (<Redirect to="/newsfeed" />)} />
          <Route exact path="/login" component={Checkin} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/newsfeed" component={NewsFeed} />
        </Switch>
      </Router>
    );
  }
}