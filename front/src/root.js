import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from "react-redux";
import Navigator from './navigator';
import RootReducer from './rootReducer';

const store = createStore(RootReducer);

ReactDOM.render(<Provider store={store}>
	  <Navigator />
	</Provider>, document.getElementById('ForYou'));

