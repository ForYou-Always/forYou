import { postReq, postReqText } from '../../common/restApi';
import { SERVER_PATH } from '../../common/constants';
import * as ACTION_TYPES from './entryActionTypes';

export const registerUser = async (param, dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_USER_REGISTRATION });
  const data = await postReq(`${SERVER_PATH}user/register`, param);
  dispatch({ type: ACTION_TYPES.RECEIVE_USER_REGISTRATION, data });
}

export const loginUser = async (param, dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOGIN });
  const data = await postReqText(`${SERVER_PATH}user/signin`, param);
  return data;
}

export const forgotPassword = async (param, dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_FORGOT_PASSWORD });
  const data = await postReqText(`${SERVER_PATH}user/forgot-password`, param);
  return data;
}

export const resetPassword = async (param, dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_FORGOT_PASSWORD });
  const data = await postReqText(`${SERVER_PATH}user/reset-password`, param);
  return data;
}

export const sendFeedbackMail = async (param, dispatch) => {
  dispatch({ type: ACTION_TYPES.RECEIVE_FEEDBACK_MAIL });
  const data = await postReqText(`${SERVER_PATH}user/testing`, param);
  console.log("response",data);
  return data;
}