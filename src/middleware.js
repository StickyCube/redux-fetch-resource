import {FETCH_RESOURCE} from './ActionTypes.js';
import RequestDelegate from './RequestDelegate.js';
import {getConfigWithDefaults} from './utils.js';

/**
 * Creates a redux middleware function for making REST requests
 * @param  {object} options                           Options to configure the behaviour
 * @param  {string} [options.defaultMethod='GET']     The default method for requests
 * @param  {function} [options.onStart=noop]          A function which will be called when the request starts
 * @param  {function} [option.onEnd=noop]             A function which will be called when the request is Successful
 * @param  {function} [option.onError=noop]           A function which will be called when there is a request/response error
 * @param  {string)} [options.startType]              An addtional secondary action to dispatch before a request starts
 * @param  {string} [options.endType]                 An addtional secondary action to dispatch When a successful response is received
 * @param  {string} [options.errorType]               An addtional secondary action to dispatch When a request/response error is encountered
 * @param  {string} [options.apiRoot='/']             Sets a base patname or url for all endpoints
 * @param  {string} [options.includeCookies='never']  Set cookie behaviour - valid options are 'never', 'always' or 'same-origin'
 * @param  {(object|function)} [options.headers={}]   A map (or function returning a map) of additional headers to send with all requests
 * @param  {function} [fetch=window.fetch]            A customized implementation of the whatwg fetch spec. This is used internally for testing. You should consider using a fetch polyfill rather than this option.
 *
 * @return {function}                                 Middleware which can be passed to redux.applyMiddleware
 */
export default function createMiddleware (options) {
  const config = getConfigWithDefaults(options);

  return store => next => action => {
    if (action.type !== FETCH_RESOURCE) {
      return next(action);
    }

    const delegate = RequestDelegate.create(
      store,
      action,
      config
    );

    return delegate().then(
      action.promise.resolve,
      action.promise.reject,
    );
  };
}
