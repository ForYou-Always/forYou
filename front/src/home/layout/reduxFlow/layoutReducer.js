import * as ACTION_TYPES from './homeActionTypes';
import { combineReducers } from 'redux-immutable';
import { fromJS, List as immutableList, Map as immutableMap  } from 'immutable';

function switchSideToggle(state = false, action){
	switch (action.type){
	case ACTION_TYPES.RECEIVE_MENU_TOGGLE:
		return action.data;
		break;
	default:
		return state;
	}
};

const homeReducer = combineReducers({
  switchSideToggle
});


export default homeReducer;