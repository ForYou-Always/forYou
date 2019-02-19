import { getReq } from '../../../common/restApi';
import { SERVER_PATH } from '../../../common/constants';
import * as ACTION_TYPES from './layoutActionTypes';

export const logOutUser = async (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOG_OUT });
  await getReq(`${SERVER_PATH}user/signout`);
}

export const deliveredPostDetails = async (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_DELIVERED_POST });
  const data = await getReq(`${SERVER_PATH}post/newPost`);
  dispatch({ type: ACTION_TYPES.RECEIVE_DELIVERED_POST, data});
  }
