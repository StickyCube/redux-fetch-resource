
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### actions.js
{: .Heading .Heading--filename }

~~~ javascript
import {combineReducers} from 'redux';
import {bindEndpointActionCreator} from 'redux-fetch-resource';

const FETCH_USERS_START = 'FETCH_USERS_START';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const FetchUsers = bindEndpointActionCreator(
  '/users',
  {
    startType: FETCH_USERS_START,
    successType: FETCH_USERS_SUCCESS,
    errorType: FETCH_USERS_ERROR
  }
);

export const reducer = combineReducers({
  users (state = [], action) {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return action.payload.body;
      case FETCH_USERS_ERROR:
        return [];
      default:
        return state;
    }
  },
  loading (state = false, action) {
    switch (action.type) {
      case FETCH_USERS_START:
        return true;
      case FETCH_USERS_SUCCESS:
      case FETCH_USERS_ERROR:
        return false;
      default:
        return state;
    }
  },
  error (state = '', action) {
    case FETCH_USERS_SUCCESS:
      return '';
    case FETCH_USERS_ERROR:
      return action.payload.statusText;
    default:
      return state;
  }
});
~~~

</div>
