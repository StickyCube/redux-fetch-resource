import test from 'ava-spec';
import {mocks, env, createStoreWithOptions} from './fixtures.js';
import {FetchResource} from '../src/index.js';

env.injectGlobals();

function reducer () {
  return { prop: 'bar' };
}

let fetch = null;
let store = null;

test.beforeEach(t => {
  fetch = mocks.successFetch();
  store = createStoreWithOptions(reducer, { fetch });
});

test('It should stringify the query option for GET', async t => {
  await store.dispatch(FetchResource('/foo', { query: { hero: true, egg: 'runny' } }));
  const [url] = fetch.firstCall.args;
  t.is(url, '/foo?hero=true&egg=runny');
});

test('It should stringify the query option for POST', async t => {
  await store.dispatch(FetchResource('/foo', { method: 'POST', query: { hero: 'spiderman', egg: 'runny' } }));
  const [url] = fetch.firstCall.args;
  t.is(url, '/foo?hero=spiderman&egg=runny');
});

test('It should accept a function as the query option with getState', async t => {
  await store.dispatch(FetchResource('/foo', {
    query: function (getState) {
      return {
        ...getState(),
        egg: 'runny'
      };
    }
  }));
  const [url] = fetch.firstCall.args;
  t.is(url, '/foo?prop=bar&egg=runny');
});
