import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';


import Checkin from './entry/checkin';
import SignUp from './entry/signup';
import NewsFeedScreen from './news-feed/news-feed-screen';

const history = createHashHistory();
export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
   		  <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          <Route exact path="/login" component={Checkin} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/newsfeed" component={NewsFeedScreen} />
        </Switch>
      </Router>
    );
  }
}