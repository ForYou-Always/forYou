import { postReq } from '../../../common/restApi';
import { SERVER_PATH } from '../../../common/constants';
import * as ACTION_TYPES from './postActionTypes';

export const postRegister = async (param,dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_POST_REGISTER });
  const data = await postReq(`${SERVER_PATH}post/newPost`,param);
  dispatch({ type: ACTION_TYPES.RECEIVE_POST_REGISTER, data});
}