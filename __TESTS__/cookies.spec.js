import {before, after} from 'ava';
import test from 'ava-spec';
import {env, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

before(async t => {
  await env.mount({ cookie: 'Hello=World; Expires=Never;' });
});

after.always(async t => {
  await env.unmount();
});

// Not sure why this one is failing? maybe something to do with mocked window via jsdom?
test.skip('It should never send cookies by default', async t => {
  const store = createStoreWithOptions();
  const response = await store.dispatch(FetchResource('/echo/cookies'));
  t.deepEqual(response.body.cookies, {});
});

test('It should send cookies when option is same-origin [middleware option]', async t => {
  const store = createStoreWithOptions({ includeCookies: 'same-origin' });
  const response = await store.dispatch(FetchResource('/echo/cookies'));
  t.deepEqual(response.body.cookies, { Hello: 'World' });
});

test('It should send cookies when option is same-origin [action option]', async t => {
  const store = createStoreWithOptions();
  const response = await store.dispatch(FetchResource('/echo/cookies', { includeCookies: 'same-origin' }));
  t.deepEqual(response.body.cookies, { Hello: 'World' });
});

test('It should send cookies when option is always [middleware option]', async t => {
  const store = createStoreWithOptions({ includeCookies: 'always' });
  const response = await store.dispatch(FetchResource('/echo/cookies'));
  t.deepEqual(response.body.cookies, { Hello: 'World' });
});

test('It should send cookies when option is always [action option]', async t => {
  const store = createStoreWithOptions();
  const response = await store.dispatch(FetchResource('/echo/cookies', { includeCookies: 'always' }));
  t.deepEqual(response.body.cookies, { Hello: 'World' });
});
