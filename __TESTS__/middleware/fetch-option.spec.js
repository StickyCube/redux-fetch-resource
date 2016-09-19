import test from 'ava';
import sinon from 'sinon';
import {createStoreWithOptions} from '../fixtures/redux.js';
import {FetchResource} from '../../src/index.js';

function dispatch (store) {
  return store.dispatch(FetchResource('/foo'));
}

let windowFetch = sinon.stub();
let optionsFetch = sinon.stub();

test.beforeEach(() => {
  windowFetch.reset();
  optionsFetch.reset();
});

test.afterEach(() => {
  delete window.fetch;
});

test('When No fetch implementation is provided, it should throw', t => {
  const store = createStoreWithOptions();
  t.throws(function () {
    dispatch(store);
  });
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
