import { postReqText } from '../../../../common/restApi';
import { SERVER_PATH } from '../../../../common/constants';
import * as ACTION_TYPES from './newsFeedActionType';

export const newPost = async (param, dispatch) => {
  dispatch({ type: ACTION_TYPES.NEW_POST });
  const data = await postReqText(`${SERVER_PATH}newsFeed/newPost`, param);
  return data;
}