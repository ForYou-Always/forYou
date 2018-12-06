import * as ACTION_TYPES from './entryActionTypes';
import { combineReducers } from 'redux-immutable';
import { fromJS, List as immutableList, Map as immutableMap  } from 'immutable';

function getSingupInfo(state = immutableMap(), action){
	switch (action.type){
	case ACTION_TYPES.RECEIVE_USER_REGISTRATION:
		return fromJS(action.data)
		break;
	default:
		return state;
	}
};

const entryReducer = combineReducers({
	getSingupInfo
});


export default entryReducer;