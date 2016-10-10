import test from 'ava-spec';
import {mocks, env, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

env.injectGlobals();

function reducer () {
  return { items: ['foo', 'bar', 'baz'] };
}

let fetch = null;
let store = null;

test.beforeEach(t => {
  fetch = mocks.successFetch();
  store = createStoreWithOptions(reducer, { fetch });
});

test('It should make the request using the correct body', async t => {
  await store.dispatch(FetchResource('/foo', {
    method: 'POST',
    body: { hero: true, egg: 'runny' }
  }));
  const {body} = fetch.firstCall.args[1];
  t.deepEqual(body, '{\"hero\":true,\"egg\":\"runny\"}');
});

test('It should accept a function as the body option with getState', async t => {
  await store.dispatch(FetchResource('/foo', {
    method: 'POST',
    body: function (getState) {
      return {
        ...getState(),
        egg: 'runny'
      };
    }
  }));
  const {body} = fetch.firstCall.args[1];
  t.deepEqual(body, '{\"items\":[\"foo\",\"bar\",\"baz\"],\"egg\":\"runny\"}');
});
