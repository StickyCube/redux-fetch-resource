import {before, after} from 'ava';
import test from 'ava-spec';
import {env, mocks, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

before(async t => {
  await env.mount();
});

after(async t => {
  await env.unmount();
});

test.describe('formatResponse option -', test => {
  function formatResponse (request, response, body) {
    return {
      message: `Hey, the status is ${response.status}`
    };
  }

  test('It Should respect the formatResponse option', async t => {
    const store = createStoreWithOptions({ formatResponse });
    const result = await store.dispatch(FetchResource('/status/202'));

    t.is(result.message, 'Hey, the status is 202');
  });
});

test.describe('formatResponseError option -', test => {
  function formatResponseError (request, response, body) {
    return {
      message: `Boo, the status is ${response.status}`
    };
  }

  test('It Should respect the formatResponse option', async t => {
    const store = createStoreWithOptions({ formatResponseError });
    try {
      await store.dispatch(FetchResource('/status/400'));
      t.fail();
    } catch (result) {
      t.is(result.message, 'Boo, the status is 400');
    }
  });
});

test.describe('formatResponseError option -', test => {
  function formatRequestError (request, error) {
    return {
      message: `A really bad thing happened - ${request.endpoint}`
    };
  }

  test('It Should respect the formatResponse option', async t => {
    const store = createStoreWithOptions({ formatRequestError, fetch: mocks.errorFetch() });
    try {
      await store.dispatch(FetchResource('/status/200'));
      t.fail();
    } catch (result) {
      t.is(result.message, 'A really bad thing happened - /status/200');
    }
  });
});
