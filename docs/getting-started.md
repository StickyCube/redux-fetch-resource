---
layout: index-page
title: Redux Fetch Resource
header: Getting Started
permalink: /getting-started
---

`redux-fetch-resource` is an attempt at a complete solution for making api requests in react/redux applications.

### Installation

install redux-fetch-resource and redux-thunk

~~~ bash
npm i --save redux-fetch-resource redux-thunk
~~~

redux-fetch-resource assumes the browser has the [fetch](https://github.com/github/fetch) and [Promise](https://github.com/stefanpenner/es6-promise) apis. So polyfill them if you havn't done so already.


### Usage

Minimally, add the following to your redux store.

~~~ javascript
// == Store.js

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReduxFetchResource from 'redux-fetch-resource';
import reducer from './Reducers.js';

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource()
  )
);
~~~

Now you are ready to define an endpoint

~~~ javascript
// === Actions.js
import {bindEndpointActionCreator} from 'redux-fetch-resource';

export const FETCH_USERS_STARTED = 'FETCH_USERS_STARTED';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export const FetchUsers = bindEndpointActionCreator(
  '/users/:team',
  {
    startType: FETCH_USERS_STARTED,
    successType: FETCH_USERS_SUCCESS
  }
);
~~~

Hook up the actions in your reducers

~~~ javascript
// == Reducers.js

import {combineReducers} from 'redux';
import {FETCH_USERS_STARTED, FETCH_USERS_SUCCESS} from './Actions.js';

export default combineReducers({
  loading (state = false, action) {
    switch (action.type) {
      case FETCH_USERS_STARTED:
        return true;
      case FETCH_USERS_SUCCESS:
        return false;
      default:
        return state;
    }
  },
  users (state = [], action) {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return action.payload.body
      default:
        return state;
    }
  }
});

~~~

And use it in your components

~~~ javascript
// == UserList.jsx

import React from 'react';
import {connect} from 'react-redux';
import {FetchUsers} from './Actions.js';

const mapStateToProps = state => ({
  users: state.users,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (id, search) => dispatch(FetchUsers({
    params: { team: id },
    query: { q: search }
  }))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class UserList extends React.Component {
  submit () {
    return this.props.onSubmit(
      this.props.teamId,
      this.refs.search.value
    );
  }

  render () {
    return (
      <div>
        <input ref='search' type='text' />
        <button onClick={() => this.submit()} >Search</button>
        <ul>
          {this.props.users.map(user => (
            <li key={user.id} >{user.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

~~~
