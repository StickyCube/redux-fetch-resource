Show Example
{: .Button--exampleToggle }

<div markdown="1" >

~~~ javascript
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReduxFetchResource, {FETCH_RESOURCE_SUCCESS} from 'redux-fetch-resource';
import reducer from './reducers.js';

const myMiddleware = store => next => action => {
  if (action.type === FETCH_RESOURCE_SUCCESS) {
    // do something when a successful response is received
  }

  return next(action);
}

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource(),
    myMiddleware
  )
);

~~~

</div>
