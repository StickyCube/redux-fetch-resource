import test from 'ava';
import {env, mocks, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

env.injectGlobals();

function dispatch (store) {
  return store.dispatch(FetchResource('/foo'));
}

const windowFetch = mocks.noopFetch();
const optionsFetch = mocks.noopFetch();

test.beforeEach(() => {
  windowFetch.reset();
  optionsFetch.reset();
});

test.afterEach(() => {
  delete window.fetch;
});

test('When fetch is on window object it should be used', t => {
  window.fetch = windowFetch;
  const store = createStoreWithOptions();
  dispatch(store);
  t.is(windowFetch.called, true);
});

test('When fetch is provided in options, it shoud be used', t => {
  const store = createStoreWithOptions({ fetch: optionsFetch });
  dispatch(store);
  t.is(optionsFetch.called, true);
});

test('When fetch is provided in options and fetch is on window object, the options should take precidence', t => {
  t.plan(2);

  window.fetch = windowFetch;
  const store = createStoreWithOptions({ fetch: optionsFetch });
  dispatch(store);

  t.is(windowFetch.called, false);
  t.is(optionsFetch.called, true);
});
