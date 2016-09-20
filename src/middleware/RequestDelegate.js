import isString from 'lodash/isString';
import warning from 'warning';
import {normalizeMethod, isValidMethod} from './utils';

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

function mapHeadersToObject (headers) {
  let object = {};

  for (let key of headers.keys()) {
    object[key] = headers.get(key);
  }

  return object;
}

export default class RequestDelegate {
  static create (store, action, config) {
    return new RequestDelegate(store, action, config);
  }

  constructor (store, action, config) {
    this.store = store;
    this.action = action;
    this.config = config;
  }

  /**
   * Resolve the endpoint for the current request
   * @return {string} url   An endpoint for the resource
   */
  getURL () {
    const {endpoint} = this.action.payload;

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
  getRequestOptions () {
    const {payload} = this.action;
    const {options = {}} = payload;
    const {defaultMethod} = this.config;

    const method = normalizeMethod(options.method || defaultMethod);

    warning(
      isValidMethod(method),
      `The request for resource at ${payload.endpoint} specified an invalid method: "${method}"`
    );

    return { method };
  }

  /**
   * Format the raw response and response data into a consumable object
   */
  formatResponse (response, data) {
    return {
      url: this.getURL(),
      body: data,
      statusCode: response.status,
      statusText: response.statusText,
      headers: mapHeadersToObject(response.headers)
    };
  }

  /**
   * Format the raw response and response data into a consumable object
   */
  formatResponseError (response, data) {
    return {
      ...this.formatResponse(response, data),
      isError: true,
      name: 'ResponseError'
    };
  }

  /**
   * Creates a formatted error object for Request errors
   */
  formatRequestError (err) {
    return {
      url: this.getURL(),
      isError: true,
      name: 'RequestError',
      message: err.message
    };
  }

  /**
   * Server response handler, attempts to parse the response as json then falls back to plain text.
   * Will return a rejected promise if the statusCode is outside of the range (200 <= statusCode <= 299)
   */
  onServerResponse (response) {
    return response.text()
      .then(text => safeParse(text))
      .then(result => response.ok
        ? this.formatResponse(response, result)
        : Promise.reject(this.formatResponseError(response, result))
      );
  }

  /**
   * Performs the actual api call using the action and config to resolve the options
   * @return {Promise}
   */
  fetch () {
    return this.config.fetch(
      this.getURL(),
      this.getRequestOptions()
    ).then(
      response => this.onServerResponse(response),
      error => Promise.reject(this.formatRequestError(error))
    );
  }
}
