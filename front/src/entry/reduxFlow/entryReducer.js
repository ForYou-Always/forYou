import * as ACTION_TYPES from './entryActions';
import { combineReducers } from 'redux-immutable';
import { fromJS, List as immutableList, Map as immutableMap  } from 'immutable';

function getLoginInfo(state = immutableMap(), action){
	switch (action.type){
	case ACTION_TYPES.RECEIVE_USER_SIGNUP:
		return fromJS(action.data)
		break;
	default:
		return state;
	}
}

const entryReducer = combineReducers({
    getLoginInfo
});


export default entryReducer;