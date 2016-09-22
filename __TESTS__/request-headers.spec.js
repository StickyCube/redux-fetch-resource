import {before, after} from 'ava';
import test from 'ava-spec';
import {env, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

let store = null;

before(async t => {
  await env.mount();
  store = createStoreWithOptions({ headers: { customheader: 12345 } });
});

after.always(async t => {
  return await env.unmount();
});

test('It should send the headers from middleware config in the request', async t => {
  const response = await store.dispatch(FetchResource('/echo/headers'));
  t.is(response.body.headers.customheader, '12345');
});

test('It should send the headers from action options in the request', async t => {
  const response = await store.dispatch(FetchResource('/echo/headers', { headers: { action: 'abcde' } }));
  t.is(response.body.headers.action, 'abcde');
});

test('It should prefer action headers over middleware config headers', async t => {
  const response = await store.dispatch(FetchResource('/echo/headers', { headers: { customheader: 67890 } }));
  t.is(response.body.headers.customheader, '67890');
});
