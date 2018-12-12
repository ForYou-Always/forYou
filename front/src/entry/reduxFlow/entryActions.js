import { postReq, postReqText } from '../../common/restApi';
import { SERVER_PATH } from '../../common/constants';
import * as ACTION_TYPES from './entryActionTypes';


export const registerUser = async (param, dispatch) => {
	dispatch({ type: ACTION_TYPES.REQUEST_USER_REGISTRATION });
	const data = await postReq(`${SERVER_PATH}user/signup`, param);
	dispatch({ type: ACTION_TYPES.RECEIVE_USER_REGISTRATION, data });
}

export const loginUser = async (param, dispatch) => {
    dispatch({ type: ACTION_TYPES.REQUEST_LOGIN });
    const data = await postReqText(`${SERVER_PATH}user/signin`, param);
    return data;
}