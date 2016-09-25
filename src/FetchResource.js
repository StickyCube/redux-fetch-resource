import { FETCH_RESOURCE } from './ActionTypes.js';

/**
 * Action creator for fetch middleware
 * @param {string} endpoint                           The endpoint of the resource
 * @param {object} [options={}]                       Additional request options
 * @param {string} [options.method='GET']             The request method
 * @param {object} [options.meta = {}]                Additional proprties to send along with secondary actions as action.meta
 * @param {function} [options.onStart=noop]           A function which will be called when the request starts
 * @param {function} [option.onEnd=noop]              A function which will be called when the request is Successful
 * @param {function} [option.onError=noop]            A function which will be called when there is a request/response error
 * @param {string)} [options.startType]               An addtional secondary action to dispatch before a request starts
 * @param {string} [options.endType]                  An addtional secondary action to dispatch When a successful response is received
 * @param {string} [options.errorType]                An addtional secondary action to dispatch When a request/response error is encountered
 * @param {string} [options.includeCookies='never']   Set cookie behaviour - valid options are 'never', 'always' or 'same-origin'
 * @param {(object|function)} [options.headers={}]    A map (or function returning a map) of additional headers to send with all requests
 */
const FetchResource = (endpoint, options = {}) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: FETCH_RESOURCE,
      promise: { resolve, reject },
      payload: { endpoint, options }
    });
  });
};

export default FetchResource;
