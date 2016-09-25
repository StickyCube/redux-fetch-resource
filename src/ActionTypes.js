function internalType (name) {
  return `@@REDUX_FETCH_RESOURCE/${name}`;
}

/**
 * Action dispatched by the FetchResource api point.
 * @type {string}
 */
export const FETCH_RESOURCE = internalType('FETCH_RESOURCE');

/**
 * Action dispatched on request and response error
 * @type {string}
 */
export const FETCH_RESOURCE_ERROR = internalType('FETCH_RESOURCE_ERROR');

/**
 * Action dispatched on request start
 * @type {string}
 */
export const FETCH_RESOURCE_START = internalType('FETCH_RESOURCE_START');

/**
 * Action dispatched on successful response received
 * @type {string}
 */
export const FETCH_RESOURCE_END = internalType('FETCH_RESOURCE_END');
