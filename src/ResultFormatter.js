import isFunction from 'lodash/isFunction';

/**
 * Maps an instance of Headers to a plain javascript object
 * @param  {Headers} headers  instance of Headers to map
 * @return {object}           mapped headers
 */
function mapHeadersToObject (headers) {
  const object = {};

  for (let key of headers.keys()) {
    object[key] = headers.get(key);
  }

  return object;
}

/**
 * Default formatter for response payloads
 */
function formatResponse (request, response, body) {
  return {
    url: request.url,
    endpoint: request.endpoint,
    body,
    statusCode: response.status,
    statusText: response.statusText,
    headers: mapHeadersToObject(response.headers),
    name: 'Response'
  };
}

/**
 * Default formatter for response errors
 */
function  formatResponseError (request, response, body) {
  return {
    url: request.url,
    endpoint: request.endpoint,
    body,
    error: { message: response.statusText },
    statusCode: response.status,
    statusText: response.statusText,
    headers: mapHeadersToObject(response.headers),
    name: 'ResponseError'
  };
}

/**
 * Default formatter for request errors
 */
function formatRequestError (request, error) {
  return {
    url: request.error,
    endpoint: request.endpoint,
    error: { message: error.message },
    statusCode: 0,
    statusText: error.message,
    name: 'RequestError'
  };
}

/**
 * [create description]
 * @return {[type]} [description]
 */
function create (config) {
  /**
   * Object with mehtods for formatting request/response action payloads
   * @type {object}
   */
  const formatter = {
    response: formatResponse,
    responseError: formatResponseError,
    requestError: formatRequestError
  };

  return formatter;
}

export default { create };
