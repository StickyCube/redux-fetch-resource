import test from 'ava';
import {env, mocks, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

let store = null;

test.before(async t => {
  await env.mount();
  store = createStoreWithOptions();
});

test.after(async t => {
  return await env.unmount();
});

test('It should resolve correctly when asking for 200', async t => {
  const response = await store.dispatch(FetchResource('/status/200'));
  t.is(response.statusCode, 200);
});

test('It should reject with an error when status code is >= 300', async t => {
  try {
    await store.dispatch(FetchResource('/status/302'));
    t.fail();
  } catch (error) {
    t.is(error.isError, true);
    t.is(error.statusCode, 302);
    t.is(error.name, 'ResponseError');
  }
});

test('It should reject with request error when fetch fails', async t => {
  window.fetch = mocks.errorFetch({ message: 'Boooo' });

  store = createStoreWithOptions();

  try {
    await store.dispatch(FetchResource('/status/200'));
    t.fail();
  } catch (error) {
    t.is(error.name, 'RequestError');
    t.is(error.isError, true);
  }
});
