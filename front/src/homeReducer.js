import { combineReducers } from 'redux-immutable';
import LayoutReducer from './home/layout/flux/layoutReducer';


export default combineReducers({
	layout: LayoutReducer
});