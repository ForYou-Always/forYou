import { postReq } from '../../common/restApi';
import { SERVER_PATH } from '../../common/constants';
import * as ACTION_TYPES from './entryActionTypes';


export const registerUser = async (param, dispatch) => {
	dispatch({ type: ACTION_TYPES.REQUEST_USER_REGISTRATION });
	const response = await postReq(`${SERVER_PATH}user/signup`, param);
	const data = await response.json();
	dispatch({ type: ACTION_TYPES.RECEIVE_USER_REGISTRATION, data });
}