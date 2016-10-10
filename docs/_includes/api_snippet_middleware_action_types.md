
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

const REQUEST_START = 'REQUEST_START';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';

export default createStore(
  reducer,
  {
    startType: REQUEST_START,
    errorType: REQUEST_ERROR,
    successType: REQUEST_SUCCESS
  }
);
~~~

</div>
