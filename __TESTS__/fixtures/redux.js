import {createStore, applyMiddleware} from 'redux';
import FetchResourceMiddleware from '../../src/index.js';

export function createStoreWithOptions (reducer, options) {
  if (arguments.length < 2) {
    options = reducer || undefined;
    reducer = () => ({});
  }

  return createStore(
    reducer,
    applyMiddleware(
      FetchResourceMiddleware(options)
    )
  );
}
