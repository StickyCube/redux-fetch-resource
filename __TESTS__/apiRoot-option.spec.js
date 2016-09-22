import test from 'ava-spec';
import {createStoreWithOptions, env, mocks} from './fixtures.js';
import {FetchResource} from '../src/index.js';

env.injectGlobals();

let fetch = null;

test.beforeEach(t => {
  fetch = mocks.successFetch();
});

test('It should append the endpoint action to apiRoot if provided', async t => {
  const store = createStoreWithOptions({ fetch, apiRoot: '/api/v1' });
  await store.dispatch(FetchResource('/foo'));
  const [url] = fetch.firstCall.args;
  t.is(url, '/api/v1/foo');
});

test('It should handle extra slashes gracefully', async t => {
  const store = createStoreWithOptions({ fetch, apiRoot: '/api/v1/' });
  await store.dispatch(FetchResource('/bar'));
  const [url] = fetch.firstCall.args;
  t.is(url, '/api/v1/bar');
});
