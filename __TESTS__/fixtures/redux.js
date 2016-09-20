import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import FetchResourceMiddleware from '../../src/index.js';

export function createStoreWithOptions (reducer, options) {
  if (arguments.length < 2) {
    options = reducer || undefined;
    reducer = () => ({});
  }

  return createStore(
    reducer,
    applyMiddleware(
      thunk,
      FetchResourceMiddleware(options)
    )
  );
}
