import isString from 'lodash/isString';
import warning from 'warning';
import ActionDispatcher from './ActionDispatcher.js';
import {normalizeMethod, isValidMethod} from './utils.js';

/**
 * Attempts to parse raw response data as JSON
 * @param  {string} text  Raw response data
 * @return {any}          Parsed json on success or the input text on failure
 */
function safeParse (text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

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
* Resolve the endpoint for the current request
* @return {string} url   An endpoint for the resource
*/
function getURL (action) {
  const {endpoint} = action.payload;

  warning(
    (
      isString(endpoint) &&
      endpoint !== ''
    ),
    `The specified endpoint must be a non empty string`
  );

  return endpoint;
}

/**
 * Creates the request options which are passed to fetch
 * @return {object} requestOptions
 */
function getRequestOptions (action, config) {
  const {payload} = action;
  const {options} = payload;
  const {defaultMethod} = config;

  const method = normalizeMethod(options.method || defaultMethod);

  warning(
    isValidMethod(method),
    `The request for resource at ${payload.endpoint} specified an invalid method: "${method}"`
  );

  return { method };
}

function create (store, action, config) {
  const dispatcher = ActionDispatcher.create(store, action, config);
  const url = getURL(action);
  const requestOptions = getRequestOptions(action, config);

  /**
   * Format the raw response and response data into a consumable object
   */
  function formatResponse (response, body) {
    return {
      url,
      body,
      statusCode: response.status,
      statusText: response.statusText,
      headers: mapHeadersToObject(response.headers),
      name: 'Response'
    };
  }

  /**
   * Format the raw response and response data into a consumable object
   */
  function formatResponseError (response, body) {
    return {
      ...formatResponse(response, body),
      name: 'ResponseError',
      isError: true
    };
  }

  /**
   * Creates a formatted error object for Request errors
   */
  function formatRequestError (err) {
    return {
      url,
      body: null,
      statusCode: -1,
      statusText: err.message,
      headers: {},
      name: 'RequestError',
      isError: true
    };
  }

  /**
   * Request start lifecycle handler
   */
  function onRequestDidStart () {
    dispatcher.onStart({ url });
  }

  /**
   * Request error lifecycle handler
   */
  function onRequestError (error) {
    const result = formatRequestError(error);
    dispatcher.onError(result);
    return Promise.reject(result);
  }

  /**
   * Response success lifecycle handler
   */
  function onResponseSuccess (response, body) {
    const result = formatResponse(response, body);
    dispatcher.onResponse(result);
    return result;
  }

  /**
   * Response error lifecycle handler
   */
  function onResponseError (response, body) {
    const result = formatResponseError(response, body);
    dispatcher.onError(result);
    return Promise.reject(result);
  }

  /**
   * Server response lifecycle handler
   * attempts to parse the response as json then falls back to plain text.
   * Will return a rejected promise if the statusCode is outside of the range (200 <= statusCode <= 299)
   */
  function onServerResponse (response) {
    return response.text()
      .then(safeParse)
      .then(body => response.ok
        ? onResponseSuccess(response, body)
        : onResponseError(response, body)
      );
  }

  /**
   * Performs the actual api call using the action and config to resolve the options
   * @return {Promise}
   */
  return function () {
    onRequestDidStart();

    return config.fetch(url, requestOptions).then(
      onServerResponse,
      onRequestError
    );
  };
}

export default { create };
