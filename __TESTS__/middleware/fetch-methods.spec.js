import test from 'ava';
import environment from '../fixtures/environment';
import {createStoreWithOptions} from '../fixtures/redux.js';
import {FetchResource} from '../../src/index.js';

let store = null;

const METHODS = [
  'GET',
  'POST',
  'PATCH',
  'DELETE',
  'PUT',
  'OPTIONS'
];

test.before(t => {
  environment.app.all('/method', function (req, res) {
    res.set('X-Custom-Header', req.method);
    res.send({ method: req.method });
  });
});

test.before(async t => {
  await environment.mount();
  global.window = environment.window;
  store = createStoreWithOptions();
});

test.after(async t => {
  return await environment.unmount();
});

METHODS.forEach(m => {
  test(`It should perform ${m} requests`, async t => {
    const response = await store.dispatch(FetchResource('/method', { method: m }));
    t.plan(2);
    t.is(response.body.method, m);
    t.is(response.headers['x-custom-header'], m);
  });
});

// === HEAD cannot have a body in the response so
test(`It should perform HEAD requests`, async t => {
  const response = await store.dispatch(FetchResource('/method', { method: 'HEAD' }));
  t.is(response.headers['x-custom-header'], 'HEAD');
});
