import test from 'ava';
import noop from 'lodash/noop';
import sinon from 'sinon';
import {createStoreWithOptions} from '../fixtures/redux.js';
import {FETCH_RESOURCE} from '../../src/index.js';

let fetch = sinon.stub().returns(new Promise(noop));
let store = createStoreWithOptions({ fetch });

test.beforeEach(t => {
  fetch.reset();
});

test('Should consume FETCH_RESOURCE actions', t => {
  store.dispatch({ type: FETCH_RESOURCE, payload: { endpoint: '/foo' }, promise: {} });
  t.is(fetch.called, true);
});

test('Should not consume other action types', t => {
  store.dispatch({ type: 'CUSTOM_ACTION' });
  t.is(fetch.called, false);
});
