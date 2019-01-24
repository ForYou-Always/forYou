import * as ACTION_TYPES from './postActionTypes';
import { combineReducers } from 'redux-immutable';
import { fromJS, List as immutableList, Map as immutableMap  } from 'immutable';

function switchSideToggle(state = false, action){
  switch (action.type){
    case ACTION_TYPES.RECEIVE_MENU_TOGGLE:
      return action.data;
    default:
      return state;
  }
};

function getPostData(state = false, action){
  switch (action.type){
    case ACTION_TYPES.RECEIVE_POST_REGISTER:
      return action.data;
    default:
      return state;
  }
};

const postReducer = combineReducers({
  switchSideToggle,
  getPostData
});


export default postReducer;