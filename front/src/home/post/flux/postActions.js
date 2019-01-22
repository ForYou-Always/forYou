import { postReq } from '../../../common/restApi';
import { SERVER_PATH } from '../../../common/constants';
import * as ACTION_TYPES from './postActionTypes';

export const postRegister = async (param,dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_POST_REGISTER });
  await postReq(`http://localhost:2020/user/post`,param);
}