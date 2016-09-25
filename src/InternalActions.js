function internalType (name) {
  return `@@REDUX_FETCH_RESOURCE/${name}`;
}

/**
 * Action dispatched by the FetchResource api point.
 * @type {string}
 */
export const FETCH_RESOURCE = internalType('FETCH_RESOURCE');

/**
 * Action dispatched on request and response error
 * @type {string}
 */
export const FETCH_RESOURCE_ERROR = internalType('FETCH_RESOURCE_ERROR');

/**
 * Action dispatched on request start
 * @type {string}
 */
export const FETCH_RESOURCE_START = internalType('FETCH_RESOURCE_START');

/**
 * Action dispatched on successful response received
 * @type {string}
 */
export const FETCH_RESOURCE_END = internalType('FETCH_RESOURCE_END');

/**
 * Action creator for fetch middleware
 * @param {string} endpoint                           The endpoint of the resource
 * @param {object} [options={}]                       Additional request options
 * @param {string} [options.method='GET']             The request method
 * @param {string)} [options.startType]               An addtional secondary action to dispatch before a request starts
 * @param {string} [options.endType]                  An addtional secondary action to dispatch When a successful response is received
 * @param {string} [options.errorType]                An addtional secondary action to dispatch When a request/response error is encountered
 * @param {string} [options.includeCookies='never']   Set cookie behaviour - valid options are 'never', 'always' or 'same-origin'
 * @param {(object|function)} [options.headers={}]    A map (or function returning a map) of additional headers to send with all requests
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
