import { combineReducers } from 'redux-immutable';
import EntryReducer from './entry/reduxFlow/entryReducer';


export default combineReducers({
	entry: EntryReducer
});