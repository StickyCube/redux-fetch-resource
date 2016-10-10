
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

// Dont send any cookies with requests (this is the default behaviour)
export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource({
      includeCookies: false
    })
  )
);

// Send cookies on the same origin domain
export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource({
      includeCookies: true
    })
  )
);

// Send cookies on cross origin requests
export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource({
      includeCookies: 'cors'
    })
  )
);

~~~

</div>
