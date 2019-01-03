import * as ACTION_TYPES from './entryActionTypes';
import { combineReducers } from 'redux-immutable';
import { fromJS, List as immutableList, Map as immutableMap  } from 'immutable';

function getSignupInfo(state = immutableMap(), action){
	switch (action.type){
	case ACTION_TYPES.RECEIVE_USER_REGISTRATION:
		return fromJS(action.data)
		break;
	default:
		return state;
	}
};

const entryReducer = combineReducers({
<<<<<<< HEAD
  getSignupInfo
=======
  getSignupInfo,
>>>>>>> refs #fy7 reset password
});


export default entryReducer;