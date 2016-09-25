import ActionDispatcher from './ActionDispatcher.js';
import LifecycleHooks from './LifecycleHooks.js';
import RequestOptions from './RequestOptions.js';

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

function create (store, action, config) {
  const dispatcher = ActionDispatcher.create(store, action, config);
  const hooks = LifecycleHooks.create(store, action, config);
  const { url, options } = RequestOptions.resolve(store, action, config);

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
    const payload = { url, ...options };
    dispatcher.onStart(payload);
    hooks.onStart(payload);
  }

  /**
   * Request error lifecycle handler
   */
  function onRequestError (error) {
    const result = formatRequestError(error);
    dispatcher.onError(result);
    hooks.onError(result);
    return Promise.reject(result);
  }

  /**
   * Response error lifecycle handler
   */
  function onResponseError (response, body) {
    const result = formatResponseError(response, body);
    dispatcher.onError(result);
    hooks.onError(result);
    return Promise.reject(result);
  }

  /**
  * Response success lifecycle handler
  */
  function onResponseSuccess (response, body) {
    const result = formatResponse(response, body);
    dispatcher.onResponse(result);
    hooks.onResponse(result);
    return result;
  }

  /**
   * Server response lifecycle handler
   * attempts to parse the response as json then falls back to plain text.
   * Will return a rejected promise if the statusCode is outside of the range (200 <= statusCode <= 299)
   */
  function onServerResponse (response) {
    return response.text()
      .then(safeParse)
      .then(body => config.isResponseError(response, body)
        ? onResponseError(response, body)
        : onResponseSuccess(response, body)
      );
  }

  /**
   * Performs the actual api call using the action and config to resolve the options
   * @return {Promise}
   */
  return function () {
    onRequestDidStart();

    return config.fetch(
      url,
      options
    ).then(onServerResponse, onRequestError);
  };
}

export default { create };
