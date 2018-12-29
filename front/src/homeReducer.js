import { combineReducers } from 'redux-immutable';
import LayoutReducer from './home/layout/reduxFlow/layoutReducer';


export default combineReducers({
	layout: LayoutReducer
});