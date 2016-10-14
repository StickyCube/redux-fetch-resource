import { FETCH_RESOURCE } from './ActionTypes.js';

/**
 * TODO:
 * This api needs to be documented
 */

/**
 * Action creator for fetch middleware
 * @param {string} endpoint                         The endpoint of the resource
 * @param {object} [options={}]                     Additional request options
 * @param {string} [options.method='GET']           The request method
 * @param {object} [options.meta = {}]              Additional proprties to send along with secondary actions as action.meta
 * @param {function} [options.onStart=noop]         A function which will be called when the request starts
 * @param {function} [option.onSuccess=noop]        A function which will be called when the request is Successful
 * @param {function} [option.onError=noop]          A function which will be called when there is a request/response error
 * @param {string} [options.startType]              An addtional secondary action to dispatch before a request starts
 * @param {string} [options.successType]            An addtional secondary action to dispatch When a successful response is received
 * @param {string} [options.errorType]              An addtional secondary action to dispatch When a request/response error is encountered
 * @param {string} [options.includeCookies=false]   Set cookie behaviour - valid options are true, false or 'cors'
 * @param {(object|function)} [options.headers={}]  A map (or function returning a map) of additional headers to send with all requests
 * @param {(object|function)} [options.body={}]     A map (or function returning a map) representing the body of the request
 * @param {(object|function)} [options.query={}]    A map (or function returning a map) representing the query
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
