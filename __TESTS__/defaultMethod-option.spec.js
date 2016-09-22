import test from 'ava-spec';
import {env, mocks, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

env.injectGlobals();

const fetch = mocks.noopFetch();
const defaultStore = createStoreWithOptions({ fetch });
const postStore = createStoreWithOptions({ fetch, defaultMethod: 'POST' });
const denormalizedStore = createStoreWithOptions({ fetch, defaultMethod: 'patch' });

test.beforeEach(t => fetch.reset());

test('It should fetch using the GET method by default', t => {
  defaultStore.dispatch(FetchResource('/foo'));

  const actual = fetch.firstCall.args[1].method;
  const expected = 'GET';

  t.is(actual, expected);
});

test('It should use the given method as default', t => {
  postStore.dispatch(FetchResource('/foo'));

  const actual = fetch.firstCall.args[1].method;
  const expected = 'POST';

  t.is(actual, expected);
});

test('It should Normalize the method name', t => {
  denormalizedStore.dispatch(FetchResource('/foo'));

  const actual = fetch.firstCall.args[1].method;
  const expected = 'PATCH';

  t.is(actual, expected);
});
