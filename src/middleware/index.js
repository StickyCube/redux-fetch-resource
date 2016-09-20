import {FETCH_RESOURCE} from '../actions';
import RequestDelegate from './RequestDelegate';
import {
  getConfigWithDefaults,
  resolveResourceUri,
  getRequestOptions } from './utils.js';

/**
 * Creates a redux middleware function for making REST requests
 * @param  {object} options                         Options to configure the behaviour
 * @param  {string} [options.defaultMethod='GET']   The default method for requests
 * @param  {function} [fetch=window.fetch]          A customized implementation of the whatwg fetch spec. This is used internally for testing.
 *                                                  You should consider using a fetch polyfill rather than this option.
 * @return {function}                               Middleware which can be passed to redux.applyMiddleware
 */
function createMiddleware (options) {
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

    delegate.fetch()
      .then(
        action.promise.resolve,
        action.promise.reject,
      );
  };
}

export default createMiddleware;
