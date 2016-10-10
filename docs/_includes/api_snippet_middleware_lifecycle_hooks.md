
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### store.js
{: .Heading .Heading--filename }

~~~ javascript
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReduxFetchResource from 'redux-fetch-resource';
import reducer from './reducers.js';

export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource({
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
    })
  )
)
~~~

</div>
