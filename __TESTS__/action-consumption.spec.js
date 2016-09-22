import test from 'ava-spec';
import {env, mocks, createStoreWithOptions} from './fixtures.js';
import {FETCH_RESOURCE} from '../src/index.js';

env.injectGlobals();

const fetch = mocks.noopFetch();
const store = createStoreWithOptions({ fetch });

test.beforeEach(t => {
  fetch.reset();
});

test('Should consume FETCH_RESOURCE actions', t => {
  store.dispatch({
    type: FETCH_RESOURCE,
    payload: { endpoint: '/foo', options: {} },
    promise: {}
  });
  t.is(fetch.called, true);
});

test('Should not consume other action types', t => {
  store.dispatch({ type: 'CUSTOM_ACTION' });
  t.is(fetch.called, false);
});
