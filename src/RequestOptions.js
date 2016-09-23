import querystring from 'querystring';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import warning from 'warning';
import {normalizeMethod, isValidMethod} from './utils.js';

function callOrDefault (value, defaultValue) {
  if (isFunction(value)) {
    value = value();
  }

  return value || defaultValue;
}

function resolveHeaders (fromConfig, fromAction) {
  const config = callOrDefault(fromConfig, {});
  const action = callOrDefault(fromAction, {});
  return { ...config, ...action };
}

function methodSupportsRequestBody (method) {
  const normalized = normalizeMethod(method);

  return (
    normalized !== 'GET' &&
    normalized !== 'HEAD' &&
    normalized !== 'DELETE' &&
    normalized !== 'TRACE'
  );
}

/**
 * Creates the request options and url which are passed to fetch
 * @return {object} requestOptions
 */
function resolve (store, action, config) {
  const request = {};

  request.method = normalizeMethod(
    action.payload.options.method || config.defaultMethod
  );

  request.headers = resolveHeaders(
    config.headers,
    action.payload.options.headers
  );

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
    !isEmpty(action.payload.options.body)
  );

  if (shouldAddBody) {
    request.body = action.payload.options.body;
  }

  // strip traling slashes
  const root = config.apiRoot.replace(/\/+$/, '');

  // strip leading and trailing slashes
  const path = action.payload.endpoint.replace(/^\/+|\/+$/g, '');

  // get the url query
  const query = querystring.stringify(action.payload.options.query || {});

  const url = query
    ? `${root}/${path}?${query}`
    : `${root}/${path}`;

  return { url, options: request };
}

export default { resolve };
