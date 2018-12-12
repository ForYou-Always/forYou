import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import HomeNavigator from './homeNavigator';
import HomeReducer from './homeReducer';

const store = createStore(HomeReducer);

ReactDOM.render(
    <Provider store={store}>
  	  <HomeNavigator />
  	</Provider>, document.getElementById('ForYou'));

