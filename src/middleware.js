import warning from 'warning';
import {FETCH_RESOURCE} from './actions.js';

/**
 * Validates and assigns default values to middleware options
 * @param  {object} options   The options passed to the store middleware creator
 * @return {object}           The validated options with defaults asssigned
 */
function getOptionsWithDefaults (options = {}) {
  /**
   * Assert that fetch is either defined on the window or options & Display a
   * helpful message if not
   */
  warning(
    (
      typeof window.fetch === 'function' ||
      typeof options.fetch === 'function'
    ),
    `redux-fetch-resource relies on the fetch api.
    for redux-fetch-resource to function correctly you must either:
      - use a wahtwg fetch polyfill, we recommend https://github.com/github/fetch
      - provide a fetch implementation in options.fetch which meets the standards outlined in the spec https://fetch.spec.whatwg.org
    `
  );

  // prefer the implementation passed in options over window
  const fetch = options.fetch || window.fetch;

  return {
    fetch
  };
}

function createMiddleware (o) {
  const options = getOptionsWithDefaults(o);

  return store => next => action => {
    if (action.type !== FETCH_RESOURCE) {
      return next(action);
    }

    return options.fetch(action.payload.url, action.payload.options);
  };
}

export default createMiddleware;
