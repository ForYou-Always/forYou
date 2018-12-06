

export const FETCH = async (path, param) => {
	const httpResponse = await window.fetch(path, param);
	return httpResponse;
}

const analyzeHttpResponse = async(httpResponse) => {
	
}