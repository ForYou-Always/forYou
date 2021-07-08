import * as ACTION_TYPES from './treeActionTypes';
import { combineReducers } from 'redux-immutable';
import { fromJS, List as immutableList, Map as immutableMap  } from 'immutable';

function getTreeFormedData(state = false, action){
	switch (action.type){
	case ACTION_TYPES.RECEIVE_TREE_DATA:
		return action.data;
		break;
	default:
		return state;
	}
};

function getVersionControlData(state = false, action){
  switch (action.type){
    case ACTION_TYPES.RECEIVE_VERSION_CONTROL_DATA:
      return action.data;
      break;
    default:
      return state;
  }
};

const treeReducer = combineReducers({
  getTreeFormedData,
  getVersionControlData
});


export default treeReducer;