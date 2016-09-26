import {before, after} from 'ava';
import test from 'ava-spec';
import sinon from 'sinon';
import {env, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

before(async t => {
  await env.mount();
});

after.always(async t => {
  await env.unmount();
});

test.describe('Middleware option -', test => {
  const onStart = sinon.stub();
  const onSuccess = sinon.stub();
  const onError = sinon.stub();
  const options = { onStart, onSuccess, onError };

  let store = null;

  test.beforeEach(t => {
    onStart.reset();
    onSuccess.reset();
    onError.reset();

    store = createStoreWithOptions(options);
  });

  test('It should respect the onSuccess hook', async t => {
    t.plan(3);

    await store.dispatch(FetchResource('/status/200'));

    t.is(onStart.called, true);
    t.is(onSuccess.called, true);
    t.is(onError.called, false);
  });

  test('It should respect the onError hook', async t => {
    t.plan(3);

    try {
      await store.dispatch(FetchResource('/status/400'));
      t.fail();
    } catch (err) {
      t.is(onStart.called, true);
      t.is(onSuccess.called, false);
      t.is(onError.called, true);
    }
  });
});

test.describe('Action option -', test => {
  const onStart = sinon.stub();
  const onSuccess = sinon.stub();
  const onError = sinon.stub();
  const options = { onStart, onSuccess, onError };

  let store = null;

  test.beforeEach(t => {
    onStart.reset();
    onSuccess.reset();
    onError.reset();

    store = createStoreWithOptions();
  });

  test('It should respect the onSuccess hook', async t => {
    t.plan(3);

    await store.dispatch(FetchResource('/status/200', options));

    t.is(onStart.called, true);
    t.is(onSuccess.called, true);
    t.is(onError.called, false);
  });

  test('It should respect the onError hook', async t => {
    t.plan(3);

    try {
      await store.dispatch(FetchResource('/status/400', options));
      t.fail();
    } catch (err) {
      t.is(onStart.called, true);
      t.is(onSuccess.called, false);
      t.is(onError.called, true);
    }
  });
});
