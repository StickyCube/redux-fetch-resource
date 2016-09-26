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

const defaults = {
  /**
   * Default fromatter for response payloads
   */
  formatResponse (request, response, body) {
    return {
      url: request.url,
      endpoint: request.endpoint,
      body,
      statusCode: response.status,
      statusText: response.statusText,
      headers: mapHeadersToObject(response.headers),
      name: 'Response'
    };
  },

  /**
   * Default formatter for response errors
   */
  formatResponseError (request, response, body) {
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
  },

  /**
   * Default formatter for request errors
   */
  formatRequestError (request, error) {
    return {
      url: request.error,
      endpoint: request.endpoint,
      error: { message: error.message },
      statusCode: 0,
      statusText: error.message,
      name: 'RequestError'
    };
  }
};

/**
 * [create description]
 * @return {[type]} [description]
 */
function create (config) {
  function resolveHandler (type) {
    return isFunction(config[type])
      ? config[type]
      : defaults[type];
  }

  /**
   * Object with mehtods for formatting request/response action payloads
   * @type {object}
   */
  const formatter = {
    response: resolveHandler('formatResponse'),
    responseError: resolveHandler('formatResponseError'),
    requestError: resolveHandler('formatRequestError')
  };

  return formatter;
}

export default { create };
