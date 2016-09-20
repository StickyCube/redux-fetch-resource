import test from 'ava';
import sinon from 'sinon';
import environment from '../fixtures/environment';
import {createStoreWithOptions} from '../fixtures/redux.js';
import {FetchResource} from '../../src/index.js';

let store = null;

test.before(t => {
  environment.app.get('/respond/:code', function (req, res) {
    const code = parseFloat(req.params.code);
    res.sendStatus(code);
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

test('It should resolve correctly when asking for 200', async t => {
  const response = await store.dispatch(FetchResource('/respond/200'));
  t.is(response.statusCode, 200);
});

test('It should reject with an error when status code is >= 300', async t => {
  return store.dispatch(FetchResource('/respond/302')).catch(response => {
    t.is(response.isError, true);
    t.is(response.statusCode, 302);
    t.is(response.name, 'ResponseError');
  });
});

test('It should reject with request error when fetch fails', async t => {
  window.fetch = sinon.stub().returns(new Promise((resolve, reject) => reject({
    message: 'Booo'
  })));

  store = createStoreWithOptions();

  return store.dispatch(FetchResource('/respond/200')).catch(response => {
    t.is(response.name, 'RequestError');
    t.is(response.isError, true);
  });
});
