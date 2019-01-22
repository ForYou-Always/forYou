import { postReqText } from '../../../common/restApi';
import { SERVER_PATH } from '../../../common/constants';

export const newPost = async (param, dispatch) => {
  const data = await postReqText(`${SERVER_PATH}newsFeed/newPost`, param);
  return data;
}

export const getNewsFeed = async () => {
  const param = {};
  const data = await postReqText(`${SERVER_PATH}newsFeed/getNewsFeed`, param);
  return data;
}