import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';


import Login from './entry/loginContainer';
import SignUp from './entry/registrationContainer';
import NewsFeedScreen from './news-feed/news-feed-screen';

const history = createHashHistory();
export default class Navigator extends Component {
  render () {
    return (
      <Router history={history}>
        <Switch>
   		  <Route exact path="/" render={() => (<Redirect to="/newsfeed" />)} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/newsfeed" component={NewsFeedScreen} />
        </Switch>
      </Router>
    );
  }
}