

export const FETCH = async (path, param) => {
  const response = await window.fetch(path, param);
  return analyzeHttpResponse(response);
}

export const FETCH_TEXT = async (path, param, type) => {
  const response = await window.fetch(path, param);
  return analyzeHttpResponse(response);
}

const analyzeHttpResponse = async(httpResponse, type) => {
  const { status } = httpResponse;
  
  switch(status){
    case 500:
      throw (await httpResponse.json());
      break;
  }
  
  let result;
  switch(type){
    case "text":
      result = await httpResponse.text();
      break;
      
    default:
      result = await httpResponse.json();
  }
  
  return result;
}