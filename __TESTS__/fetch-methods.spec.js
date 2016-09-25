import {before, after} from 'ava';
import test from 'ava-spec';
import {env, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

let store = null;

const METHODS = [
  'GET', 'POST', 'PATCH',
  'DELETE', 'PUT', 'OPTIONS'
];

before(async t => {
  await env.mount();
  store = createStoreWithOptions();
});

after.always(async t => {
  await env.unmount();
});

METHODS.forEach(m => {
  test(`It should perform ${m} requests`, async t => {
    const response = await store.dispatch(FetchResource('/echo/method', { method: m }));
    t.plan(2);
    t.is(response.body.method, m);
    t.is(response.headers['x-echo-prop'], m);
  });
});

// === HEAD cannot have a body in the response so
test(`It should perform HEAD requests`, async t => {
  const response = await store.dispatch(FetchResource('/echo/method', { method: 'HEAD' }));
  t.is(response.headers['x-echo-prop'], 'HEAD');
});
