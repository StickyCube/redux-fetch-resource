import isFunction from 'lodash/isFunction';

function create (store, action, config) {
  function invoke (func, payload) {
    if (isFunction(func)) {
      return func(payload, store.dispatch, store.getState);
    }
  }

  function createInvokableForKey (key) {
    return function (payload) {
      invoke(config[key], payload);
      invoke(action.payload.options[key], payload);
    };
  }

  return {
    onStart: createInvokableForKey('onStart'),
    onResponse: createInvokableForKey('onEnd'),
    onError: createInvokableForKey('onError')
  };
}

export default { create };
