import querystring from 'querystring';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import warning from 'warning';
import {normalizeMethod, isValidMethod} from './utils.js';

/**
 * Create a function which invokes the first argument with the redux store's getState
 * @param  {object} store The redux store
 * @return {function}     createInvoker~invoker
 */
function createInvoker (store) {
  /**
   * A function which will call it's first argument or return it
   * @param  {any} value  A function to call or value to return
   * @return {any}        The return value of value() when it is a function
   */
  const invoker = function (value) {
    return isFunction(value)
      ? value(store.getState)
      : value;
  };

  return invoker;
}

/**
 * Test whether a given http method supports a body in the request
 * @param  {string} method
 * @return {boolean}
 */
function methodSupportsRequestBody (method) {
  const normalized = normalizeMethod(method);

  return (
    normalized !== 'GET' &&
    normalized !== 'HEAD' &&
    normalized !== 'DELETE' &&
    normalized !== 'TRACE'
  );
}

function getCookiesOption (mode) {
  if (mode === 'cors') {
    return 'include';
  }

  if (mode === true) {
    return 'same-origin';
  }
}

function serializeBody (data) {
  if (isString(data)) {
    return data;
  }

  return JSON.stringify(data)
}

/**
 * Creates the request options and url which are passed to fetch
 * @return {object} requestOptions
 */
function resolve (store, action, config) {
  const invoke = createInvoker(store);
  const request = {};

  function resolveQuery () {
    return querystring.stringify(
      invoke(action.payload.options.query)
    );
  }

  function resolveUrl () {
    const root = config.apiRoot || '';
    const path = action.payload.endpoint;
    const query = resolveQuery();

    return isEmpty(query)
      ? `${root}${path}`
      : `${root}${path}?${query}`;
  }

  request.method = normalizeMethod(
    action.payload.options.method || config.defaultMethod
  );

  request.headers = {
    ...invoke(config.headers || {}),
    ...invoke(action.payload.options.headers || {})
  };

  const cookies = getCookiesOption(
    typeof action.payload.options.includeCookies !== 'undefined'
      ? action.payload.options.includeCookies
      : config.includeCookies
  );

  if (cookies) {
    request.credentials = cookies;
  }

  warning(
    isValidMethod(request.method),
    `The request for resource at ${action.payload.endpoint} specified an invalid method: "${request.method}"`
  );

  warning(
    (
      isString(action.payload.endpoint) &&
      !isEmpty(action.payload.endpoint)
    ),
    `The specified endpoint must be a non empty string`
  );

  const shouldAddBody = (
    methodSupportsRequestBody(request.method) &&
    (
      isFunction(action.payload.options.body) ||
      isPlainObject(action.payload.options.body)
    )
  );

  if (shouldAddBody) {
    const body = invoke(action.payload.options.body);

    if (body) {
      request.body = serializeBody(body);
    }
  }

  return {
    url: resolveUrl(),
    options: request
  };
}

export default { resolve };
