import { FETCH } from './serverCall';

function constructFormData(param){
  const formData = new FormData();
  Object.keys(param).map(e => formData.append(e, param[e]));
  return formData;
}

const jsonHeader = {
    "Content-type": "application/json"
}

export const getReq = async (URL) =>{
  const response = await FETCH(URL, {
    method:'GET',
    headers: jsonHeader
  });
  return response; 
}

export const postReq = async (URL,param) => {
  const response = await FETCH(URL, {
    method:'POST',
    headers: jsonHeader,
    body: JSON.stringify(param)
  });
  return response; 
}

export const postReqForm = async (URL,param) =>{
  const response = await FETCH(URL, {
    method:'POST',
    body: constructFormData(param)
  });
  return response; 
}

export const putReq = async (URL,param) =>{
  const response = await FETCH(URL, {
    method:'PUT',
    headers: jsonHeader,
    body: JSON.stringify(param)
  });
  return response; 
}

export const deleteReq = async (URL,param) =>{
  const response = await FETCH(URL, {
    method:'DELETE',
    headers: jsonHeader,
    body: JSON.stringify(param)
  });
  return response; 
}
