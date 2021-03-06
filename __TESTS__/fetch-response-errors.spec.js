import {before, after} from 'ava';
import test from 'ava-spec';
import {env, mocks, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

let store = null;

before(async t => {
  await env.mount();
  store = createStoreWithOptions();
});

after.always(async t => {
  await env.unmount();
});

test('It should resolve correctly when asking for 200', async t => {
  const response = await store.dispatch(FetchResource('/status/200'));
  t.is(response.statusCode, 200);
});

test('It should reject with an error when status code is >= 300', async t => {
  try {
    await store.dispatch(FetchResource('/status/302'));
    t.fail();
  } catch (result) {
    t.is(typeof result.error, 'object');
    t.is(result.statusCode, 302);
    t.is(result.name, 'ResponseError');
  }
});

test('It should reject with request error when fetch fails', async t => {
  window.fetch = mocks.errorFetch({ message: 'Boooo' });

  store = createStoreWithOptions();

  try {
    await store.dispatch(FetchResource('/status/200'));
    t.fail();
  } catch (result) {
    t.is(typeof result.error, 'object');
    t.is(result.statusCode, 0);
    t.is(result.name, 'RequestError');
  }
});
