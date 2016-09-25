import test from 'ava';
import {env, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

let store = null;

function isResponseError (response, body) {
  return (
    !response.ok ||
    response.status === 201 ||
    body.data === 'IS_ERROR'
  );
}

test.before(async t => {
  env.app.all('/error', (req, res) => res.send({ data: 'IS_ERROR' }));
  await env.mount();
});

test.after.always(async t => {
  await env.unmount();
});

test.beforeEach(t => {
  store = createStoreWithOptions({ isResponseError });
});

test('It should not consider 200 an error', async t => {
  try {
    await store.dispatch(FetchResource('/status/200'));
    t.pass();
  } catch (e) {
    console.log(e);
    t.fail();
  }
});

test('It should condider 201 an error', async t => {
  try {
    await store.dispatch(FetchResource('/status/201'));
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test('It should condider body.data: IS_ERROR an error', async t => {
  try {
    await store.dispatch(FetchResource('/erorr'));
    t.fail();
  } catch (e) {
    t.pass();
  }
});
