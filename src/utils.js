import warning from 'warning';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

/**
 * Array of valid, supported HTTP methods
 * @type {string[]}
 */
const VALID_HTTP_METHODS = [
  'GET', 'HEAD', 'POST',
  'PUT', 'DELETE', 'OPTIONS',
  'CONNECT', 'PATCH'
];

const METHOD_ERROR_MESSAGE = `Please use one of ${VALID_HTTP_METHODS.join(', ')}`;

/**
 * Normalizes a method name such that it is uppercase and without whitespace
 * @param  {string} method  Method name to normalize
 * @return {string}         The normalized method name
 */
export function normalizeMethod (method) {
  return isString(method)
    ? method.toUpperCase().trim()
    : '';
}

/**
 * Test whether a given method name is valid. `method` will be normalized before
 * testing wheter it is valid.
 * @param  {string}  method   The method to check
 * @return {boolean}          If this method name is valid
 */
export function isValidMethod (method) {
  return VALID_HTTP_METHODS.indexOf(normalizeMethod(method)) > -1;
}

/**
 * Validates and assigns default values to middleware options
 * @param  {object} options   The options passed to the store middleware creator
 * @return {object}           The validated options with defaults asssigned
 */
export function getConfigWithDefaults (options = {}) {
  /**
   * Assert that fetch is either defined on the window or options
   */
  warning(
    (
      typeof window.fetch === 'function' ||
      typeof options.fetch === 'function'
    ),
    `redux-fetch-resource relies on the fetch api.
    for redux-fetch-resource to function correctly you must either:
      - use a wahtwg fetch polyfill, we recommend https://github.com/github/fetch
      - provide a fetch implementation in options.fetch which meets the standards outlined in the spec https://fetch.spec.whatwg.org`
  );

  // prefer the implementation passed in options over window
  let fetch = options.fetch || window.fetch.bind(window);

  /**
   * Assert that options.defaultMethod is valid and normalized if it has been
   * provided Otherwise default it to 'GET'
   */
  warning(
    (
      options.defaultMethod == null ||
      isValidMethod(options.defaultMethod)
    ),
    `The method provided in options.defaultMethod ${options.defaultMethod} is invalid or not supported.
    ${METHOD_ERROR_MESSAGE}`
  );

  let defaultMethod = options.defaultMethod || 'GET';

  /**
   * Assert that startType, endType and errorType are strings or Symbols
   */
  'startType endType errorType'.split(' ').forEach(elm => {
    warning(
      (
        options[elm] == null ||
        isString(options[elm])
      ),
      `Expected option ${elm} to be a string but got ${typeof options[elm]}`
    );
  });

  /**
   * Assert that apiRoot is a string if it exists
   */
  warning(
    (
      options.apiRoot == null ||
      isString(options.apiRoot)
    ),
    `Expected option apiRoot to be a string gut got ${typeof options.apiRoot}`
  );

  warning(
    options.includeCookies == null ||
    options.includeCookies === 'never' ||
    options.includeCookies === 'same-origin' ||
    options.includeCookies === 'always',
    `Expected option includeCookies to be one of 'never', 'same-origin' or 'always' but got ${options.includeCookies}`
  );

  let includeCookies = options.includeCookies || 'never';

  warning(
    options.isResponseError == null ||
    isFunction(options.isResponseError),
    `Expected option isResponseError to be a function but got ${typeof options.isResponseError}`
  );

  let isResponseError = isFunction(options.isResponseError)
    ? options.isResponseError
    : response => !response.ok;

  return {
    ...options,
    fetch,
    defaultMethod,
    includeCookies,
    isResponseError
  };
}
