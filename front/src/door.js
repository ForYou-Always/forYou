import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from "react-redux";
import DoorNavigator from './doorNavigator';
import DoorReducer from './doorReducer';

const store = createStore(DoorReducer);

ReactDOM.render(<Provider store={store}>
	  <DoorNavigator />
	</Provider>, document.getElementById('ForYou'));

