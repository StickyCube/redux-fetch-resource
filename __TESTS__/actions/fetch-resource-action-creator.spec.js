import test from 'ava';
import {FetchResource, FETCH_RESOURCE} from '../../src/index.js';

test('It should return an action with the expected type', t => {
  const { type } = FetchResource();
  t.is(type, FETCH_RESOURCE);
});

test('It should assign the endpoint to payload', t => {
  const { payload } = FetchResource('/foo');
  t.is(payload.endpoint, '/foo');
});
