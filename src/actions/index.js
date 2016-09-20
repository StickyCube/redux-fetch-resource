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
 * @param {object} [options={}]             Additional request options
 * @param {string} [options.method='GET']   The request method
 */
export const FetchResource = (endpoint, options = {}) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: FETCH_RESOURCE,
      promise: { resolve, reject },
      payload: { endpoint, options }
    });
  });
};
