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

function sendFeedbackMail(state = false, action){
  switch (action.type){
  case ACTION_TYPES.RECEIVE_FEEDBACK_MAIL:
    return action.data
    break;
  default:
    return state;
  }
};

const entryReducer = combineReducers({
  getSignupInfo,
  sendFeedbackMail
});


export default entryReducer;