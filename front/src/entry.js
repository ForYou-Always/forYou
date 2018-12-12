import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from "react-redux";
import EntryNavigator from './entryNavigator';
import RootReducer from './rootReducer';

const store = createStore(RootReducer);

ReactDOM.render(<Provider store={store}>
	  <EntryNavigator />
	</Provider>, document.getElementById('ForYou'));

