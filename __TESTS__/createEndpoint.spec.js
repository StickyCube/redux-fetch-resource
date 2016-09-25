import {before, after} from 'ava';
import test from 'ava-spec';
import {env, createStoreWithOptions} from './fixtures.js';
import {createEndpoint} from '../src/index.js';

before(async t => {
  await env.mount();
});

after.always(async t => {
  await env.unmount();
});

test('It should make a request to the correct endpoint', async t => {
  const store = createStoreWithOptions();
  const Fetch = createEndpoint('/status/200');

  const response = await store.dispatch(Fetch());

  t.is(response.statusCode, 200);
});

test('It should respect params option', async t => {
  const store = createStoreWithOptions();
  const Fetch = createEndpoint('/status/:code');

  const response = await store.dispatch(Fetch({ params: { code: 230 } }));

  t.is(response.statusCode, 230);
});
