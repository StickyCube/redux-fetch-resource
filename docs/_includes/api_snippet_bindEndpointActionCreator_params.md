
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### ActionReducer.js
{: .Heading .Heading--filename }
~~~ javascript
import {combineReducers} from 'redux';
import {bindEndpointActionCreator} from 'redux-fetch-resource';

const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export const FetchUsers = bindEndpointActionCreator(
  '/users/:team',
  {
    successType: FETCH_USERS_SUCCESS
  }
);
~~~

#### MyComponent.jsx
{: .Heading .Heading--filename }

~~~ javascript
import React from 'react';
import {connect} from 'react-redux';
import {FetchUsers} from './ActionReducer.js';

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: team => dispatch(
    FetchUsers({ params: { team } })
  )
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~

</div>
