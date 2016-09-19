function internalType (name) {
  return `@@REDUX_FETCH_RESOURCE/${name}`;
}

export const FETCH_RESOURCE = internalType('FETCH_RESOURCE');
export const FETCH_RESOURCE_REQUEST_ERROR = internalType('FETCH_RESOURCE_REQUEST_ERROR');
export const FETCH_RESOURCE_REQUEST_START = internalType('FETCH_RESOURCE_REQUEST_START');
export const FETCH_RESOURCE_RESPONSE_SUCCESS = internalType('FETCH_RESOURCE_RESPONSE_SUCCESS');
export const FETCH_RESOURCE_RESPONSE_ERROR = internalType('FETCH_RESOURCE_RESPONSE_ERROR');

/**
 * Action creator for fetch middleware
 * @param {string} endpoint                 The endpoint of the resource
 */
export const FetchResource = (endpoint) => ({
  type: FETCH_RESOURCE,
  payload: { endpoint }
});
