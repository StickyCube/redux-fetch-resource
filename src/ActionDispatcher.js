import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import {
  FETCH_RESOURCE_ERROR,
  FETCH_RESOURCE_START,
  FETCH_RESOURCE_END } from './InternalActions.js';

/**
 * Create an action dispatcher. used to dispatch secondary actions to the redux store
 * @param  {object} store  Redux store
 * @param  {object} action The redux action currently being processed
 * @param  {object} config The middleware config
 * @return {[type]}        [description]
 */
function create (store, action, config) {
  /**
   * Safely dispatch an action to the redux store
   * @param  {function} [actionCreator]   An action creator
   * @param  {object}   payload           The action payload
   */
  function safeDispatch (actionCreator, payload) {
    if (isFunction(actionCreator)) {
      store.dispatch(actionCreator(payload));
    }
  }

  /**
   * Creates an action creator with the given action type
   * @param  {string} [type]  The action type
   * @return {function}       An Action creator
   */
  function getActionCreator (type) {
    return isString(type)
      ? payload => ({ type, payload })
      : null;
  }

  /**
   * Compose an arbitry number of action types into a single dispatch function
   * @param  {string} actionTypes...  Action types to compose
   * @return {function}               A function which dispatches an action for each valid type
   */
  function createDispatcherForTypes (...actionTypes) {
    return function (payload) {
      actionTypes.forEach(type => safeDispatch(
        getActionCreator(type),
        payload
      ));
    };
  }

  /**
   * A dispatcher to send secondary actions to the redux store
   * @type {object}
   * @prop {function} onStart Dispateches actions when the request starts
   * @prop {function} onError Dispateches actions when the request encounters an error
   * @prop {function} onEnd   Dispateches actions when the response is received
   */
  const dispatcher = {
    onStart: createDispatcherForTypes(
      FETCH_RESOURCE_START,
      config.startType,
      action.payload.options.startType
    ),

    onError: createDispatcherForTypes(
      FETCH_RESOURCE_ERROR,
      config.errorType,
      action.payload.options.errorType
    ),

    onResponse: createDispatcherForTypes(
      FETCH_RESOURCE_END,
      config.endType,
      action.payload.options.endType
    )
  };

  return dispatcher;
}

export default { create };
