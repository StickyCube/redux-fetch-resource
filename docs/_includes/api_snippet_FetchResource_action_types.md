
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### MyComponent.jsx
{: .Heading .Heading--filename }

~~~ javascript
import React from 'react';
import {connect} from 'react-redux';
import {FetchResource} from 'redux-fetch-resource';
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR } from './ActionReducer.js';

const mapDispatchToProps = dispatch => ({
  /**
   * Makes a GET request to http://mydomain.com/users and specifies secondary
   * actions to dispatch during the lifetime of the request.
   */
  fetchUsers: () => dispatch(FetchResource(
    '/users',
    {
      startType: FETCH_USERS_START,
      successType: FETCH_USERS_SUCCESS,
      errorType: FETCH_USERS_ERROR
    }
  ))
});

@connect(null, mapDispatchToProps)
export default MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~

#### ActionReducer.js
{: .Heading .Heading--filename }

~~~ javascript
export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export default function reducer (state = {}, action) {
  switch (action.type) {
    case FETCH_USERS_START:
      // Set a loading flag
    case FETCH_USERS_SUCCESS:
      // Add the users to state
    case FETCH_USERS_ERROR:
      // Set an error message
    default:
      return state;
  }
};
~~~

</div>
