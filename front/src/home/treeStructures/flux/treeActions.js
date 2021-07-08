import { getReq } from '../../../common/restApi';
import { SERVER_PATH } from '../../../common/constants';
import * as ACTION_TYPES from './treeActionTypes';

export const retreiveHierarchy = async (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_TREE_DATA });
//  const data = await getReq(`${SERVER_PATH}user/signo`);
  const data = await getReq(`http://192.168.1.10:2060/worksheet/pas/hiearchy`);
  dispatch({ type: ACTION_TYPES.RECEIVE_TREE_DATA, data });
}

export const getVersionControlData = async (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_VERSION_CONTROL_DATA });
  const data = await getReq(`${SERVER_PATH}intraweb/version/control`);
  dispatch({ type: ACTION_TYPES.RECEIVE_VERSION_CONTROL_DATA, data });
}