
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### actions.js
{: .Heading .Heading--filename }

~~~ javascript
import {bindEndpointActionCreator} from 'redux-fetch-resource';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const FetchUsers = bindEndpointActionCreator(
  '/users',
  {
    onStart (payload, dispatch, getState) {
      console.log('Starting request...');
      dispatch({ type: FETCH_USERS_START });
    },
    onSuccess (payload, dispatch, getState) {
      console.log('Success!');
      dispatch({ type: FETCH_USERS_SUCCESS });
    },
    onError (payload, dispatch, getState) {
      console.log('Failed...');
      dispatch({ type: FETCH_USERS_ERROR });
    }
  }
);
~~~

</div>
