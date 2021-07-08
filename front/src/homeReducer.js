import { combineReducers } from 'redux-immutable';
import LayoutReducer from './home/layout/flux/layoutReducer';
import TreeReducer from './home/treeStructures/flux/treeReducer';


export default combineReducers({
	layout: LayoutReducer,
	tree: TreeReducer,
});