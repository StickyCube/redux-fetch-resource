
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

// Use a function to resolve header which is called before every request
export const createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource({
      headers: function (getState) {
        return {
          Authorization: 'Bearer ' + window.localStorage.getItem('token');
        };
      }
    })
  )
);

// or a plain object
export const createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource({
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*'
      }
    });
  )
);

~~~

</div>
