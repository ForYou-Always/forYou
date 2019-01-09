import { getReq } from '../../../common/restApi';
import { SERVER_PATH } from '../../../common/constants';
import * as ACTION_TYPES from './layoutActionTypes';

export const logOutUser = async (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOG_OUT });
  await getReq(`${SERVER_PATH}user/signout`);
}