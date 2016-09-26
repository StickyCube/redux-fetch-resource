import ActionDispatcher from './ActionDispatcher.js';
import LifecycleHooks from './LifecycleHooks.js';
import ResultFormatter from './ResultFormatter.js';
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

function create (store, action, config) {
  const {endpoint} = action.payload;
  const dispatcher = ActionDispatcher.create(store, action, config);
  const hooks = LifecycleHooks.create(store, action, config);
  const format = ResultFormatter.create(config);

  const { url, options } = RequestOptions.resolve(store, action, config);
  const request = { endpoint, url, options };

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
    const result = format.requestError(request, error);
    dispatcher.onError(result);
    hooks.onError(result);
    return Promise.reject(result);
  }

  /**
   * Response error lifecycle handler
   */
  function onResponseError (response, body) {
    const result = format.responseError(request, response, body);
    dispatcher.onError(result);
    hooks.onError(result);
    return Promise.reject(result);
  }

  /**
  * Response success lifecycle handler
  */
  function onResponseSuccess (response, body) {
    const result = format.response(request, response, body);
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
