import {before, after} from 'ava';
import test from 'ava-spec';
import {combineReducers} from 'redux';
import {env, mocks, createStoreWithOptions} from './fixtures.js';
import {
  FetchResource,
  FETCH_RESOURCE_ERROR,
  FETCH_RESOURCE_START,
  FETCH_RESOURCE_SUCCESS } from '../src/index.js';

function createSinglePropertyReducer (type) {
  return combineReducers({
    passed: (state = false, action) => action.type === type
      ? true
      : state
  });
}

before(async t => {
  await env.mount();
});

after.always(async t => {
  await env.unmount();
});

test.describe('Internal secondary actions -', test => {
  test('It should dispatch when the request starts', async t => {
    const reducer = createSinglePropertyReducer(FETCH_RESOURCE_START);
    const store = createStoreWithOptions(reducer);

    t.plan(2);
    t.deepEqual(store.getState(), { passed: false });

    await store.dispatch(FetchResource('/status/200'));

    t.deepEqual(store.getState(), { passed: true });
  });

  test('It should dispatch when the request succeeds', async t => {
    const reducer = createSinglePropertyReducer(FETCH_RESOURCE_SUCCESS);
    const store = createStoreWithOptions(reducer);

    t.plan(2);
    t.deepEqual(store.getState(), { passed: false });

    await store.dispatch(FetchResource('/status/200'));

    t.deepEqual(store.getState(), { passed: true });
  });

  test('It should dispatch when there is a request error', async t => {
    const reducer = createSinglePropertyReducer(FETCH_RESOURCE_ERROR);
    const store = createStoreWithOptions(reducer, { fetch: mocks.errorFetch() });

    t.plan(3);
    t.deepEqual(store.getState(), { passed: false });

    try {
      await store.dispatch(FetchResource('/status/500'));
      t.fail();
    } catch (e) {
      t.is(e.name, 'RequestError');
      t.deepEqual(store.getState(), { passed: true });
    }
  });

  test('It should dispatch when there is a response error', async t => {
    const reducer = createSinglePropertyReducer(FETCH_RESOURCE_ERROR);
    const store = createStoreWithOptions(reducer);

    t.plan(3);
    t.deepEqual(store.getState(), { passed: false });

    try {
      await store.dispatch(FetchResource('/status/500'));
      t.fail();
    } catch (e) {
      t.is(e.name, 'ResponseError');
      t.deepEqual(store.getState(), { passed: true });
    }
  });
});

test.describe('Custom secondary actions -', test => {
  test.describe('Via middleware options -', test => {
    const REQUEST_START = 'REQUEST_START';
    const REQUEST_ERROR = 'REQUEST_ERROR';
    const RESPONSE_SUCCESS = 'RESPONSE_SUCCESS';
    const RESPONSE_ERROR = 'RESPONSE_ERROR';

    test('It should dispatch when the request starts', async t => {
      const reducer = createSinglePropertyReducer(REQUEST_START);
      const store = createStoreWithOptions(reducer, { startType: REQUEST_START });

      t.plan(2);
      t.deepEqual(store.getState(), { passed: false });

      await store.dispatch(FetchResource('/status/200'));

      t.deepEqual(store.getState(), { passed: true });
    });

    test('It should dispatch when the request succeeds', async t => {
      const reducer = createSinglePropertyReducer(RESPONSE_SUCCESS);
      const store = createStoreWithOptions(reducer, { successType: RESPONSE_SUCCESS });

      t.plan(2);
      t.deepEqual(store.getState(), { passed: false });

      await store.dispatch(FetchResource('/status/200'));

      t.deepEqual(store.getState(), { passed: true });
    });

    test('It should dispatch when there is a request error', async t => {
      const reducer = createSinglePropertyReducer(REQUEST_ERROR);
      const store = createStoreWithOptions(reducer, { errorType: REQUEST_ERROR, fetch: mocks.errorFetch() });

      t.plan(3);
      t.deepEqual(store.getState(), { passed: false });

      try {
        await store.dispatch(FetchResource('/status/500'));
        t.fail();
      } catch (e) {
        t.is(e.name, 'RequestError');
        t.deepEqual(store.getState(), { passed: true });
      }
    });

    test('It should dispatch when there is a response error', async t => {
      const reducer = createSinglePropertyReducer(RESPONSE_ERROR);
      const store = createStoreWithOptions(reducer, { errorType: RESPONSE_ERROR });

      t.plan(3);
      t.deepEqual(store.getState(), { passed: false });

      try {
        await store.dispatch(FetchResource('/status/500'));
        t.fail();
      } catch (e) {
        t.is(e.name, 'ResponseError');
        t.deepEqual(store.getState(), { passed: true });
      }
    });
  });

  test.describe('Via action options -', test => {
    const REQUEST_START = 'REQUEST_START';
    const REQUEST_ERROR = 'REQUEST_ERROR';
    const RESPONSE_SUCCESS = 'RESPONSE_SUCCESS';
    const RESPONSE_ERROR = 'RESPONSE_ERROR';

    test('It should dispatch when the request starts', async t => {
      const reducer = createSinglePropertyReducer(REQUEST_START);
      const store = createStoreWithOptions(reducer);

      t.plan(2);
      t.deepEqual(store.getState(), { passed: false });

      await store.dispatch(FetchResource('/status/200', { startType: REQUEST_START }));

      t.deepEqual(store.getState(), { passed: true });
    });

    test('It should dispatch when the request succeeds', async t => {
      const reducer = createSinglePropertyReducer(RESPONSE_SUCCESS);
      const store = createStoreWithOptions(reducer);

      t.plan(2);
      t.deepEqual(store.getState(), { passed: false });

      await store.dispatch(FetchResource('/status/200', { successType: RESPONSE_SUCCESS }));

      t.deepEqual(store.getState(), { passed: true });
    });

    test('It should dispatch when there is a request error', async t => {
      const reducer = createSinglePropertyReducer(REQUEST_ERROR);
      const store = createStoreWithOptions(reducer, { fetch: mocks.errorFetch() });

      t.plan(3);
      t.deepEqual(store.getState(), { passed: false });

      try {
        await store.dispatch(FetchResource('/status/500', { errorType: REQUEST_ERROR }));
        t.fail();
      } catch (e) {
        t.is(e.name, 'RequestError');
        t.deepEqual(store.getState(), { passed: true });
      }
    });

    test('It should dispatch when there is a response error', async t => {
      const reducer = createSinglePropertyReducer(RESPONSE_ERROR);
      const store = createStoreWithOptions(reducer);

      t.plan(3);
      t.deepEqual(store.getState(), { passed: false });

      try {
        await store.dispatch(FetchResource('/status/500', { errorType: RESPONSE_ERROR }));
        t.fail();
      } catch (e) {
        t.is(e.name, 'ResponseError');
        t.deepEqual(store.getState(), { passed: true });
      }
    });
  });
});

test.describe('secondary actions with meta option', test => {
  const REQUEST_START = 'REQUEST_START';
  const REQUEST_ERROR = 'REQUEST_ERROR';
  const RESPONSE_SUCCESS = 'RESPONSE_SUCCESS';
  const RESPONSE_ERROR = 'RESPONSE_ERROR';

  function createReducer (type) {
    return function (state = { meta: null }, action) {
      switch (action.type) {
        case type:
          return { meta: action.meta };
        default:
          return state;
      }
    };
  }

  test('It should send meta object with the action when the request starts', async t => {
    const reducer = createReducer(REQUEST_START);
    const store = createStoreWithOptions(reducer);

    t.plan(2);
    t.deepEqual(store.getState(), { meta: null });

    await store.dispatch(FetchResource('/status/200', { startType: REQUEST_START, meta: { foo: 1 } }));

    t.deepEqual(store.getState(), { meta: { foo: 1 } });
  });

  test('It should send meta object with the action when the request succeeds', async t => {
    const reducer = createReducer(RESPONSE_SUCCESS);
    const store = createStoreWithOptions(reducer);

    t.plan(2);
    t.deepEqual(store.getState(), { meta: null });

    await store.dispatch(FetchResource('/status/200', { successType: RESPONSE_SUCCESS, meta: { foo: 2 } }));

    t.deepEqual(store.getState(), { meta: { foo: 2 } });
  });

  test('It should send meta object with the action when there is a request error', async t => {
    const reducer = createReducer(REQUEST_ERROR);
    const store = createStoreWithOptions(reducer, { fetch: mocks.errorFetch() });

    t.plan(3);
    t.deepEqual(store.getState(), { meta: null });

    try {
      await store.dispatch(FetchResource('/status/500', { errorType: REQUEST_ERROR, meta: { foo: 3 } }));
      t.fail();
    } catch (e) {
      t.is(e.name, 'RequestError');
      t.deepEqual(store.getState(), { meta: { foo: 3 } });
    }
  });

  test('It should send meta object with the action when there is a response error', async t => {
    const reducer = createReducer(RESPONSE_ERROR);
    const store = createStoreWithOptions(reducer);

    t.plan(3);
    t.deepEqual(store.getState(), { meta: null });

    try {
      await store.dispatch(FetchResource('/status/500', { errorType: RESPONSE_ERROR, meta: { foo: 4 } }));
      t.fail();
    } catch (e) {
      t.is(e.name, 'ResponseError');
      t.deepEqual(store.getState(), { meta: { foo: 4 } });
    }
  });
});
