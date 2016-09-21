import {FETCH_RESOURCE} from './InternalActions.js';
import RequestDelegate from './RequestDelegate.js';
import {getConfigWithDefaults} from './utils.js';

/**
 * Creates a redux middleware function for making REST requests
 * @param  {object} options                         Options to configure the behaviour
 * @param  {string} [options.defaultMethod='GET']   The default method for requests
 * @param  {(string|Symbol)} [options.startType]    An addtional secondary action to dispatch before a request starts
 * @param  {string} [options.endType]               An addtional secondary action to dispatch When a successful response is received
 * @param  {string} [options.errorType]             An addtional secondary action to dispatch When a request/response error is encountered
 * @param  {function} [fetch=window.fetch]          A customized implementation of the whatwg fetch spec. This is used internally for testing. You should consider using a fetch polyfill rather than this option.
 * @return {function}                               Middleware which can be passed to redux.applyMiddleware
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
