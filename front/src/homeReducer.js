import { combineReducers } from 'redux-immutable';
import LayoutReducer from './home/layout/flux/layoutReducer';
import PostReducer from './home/post/flux/postReducer';


export default combineReducers({
	layout: LayoutReducer,
	post: PostReducer
});