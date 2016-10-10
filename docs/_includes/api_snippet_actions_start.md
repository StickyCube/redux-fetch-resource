Show Example
{: .Button--exampleToggle }

<div markdown="1" >

~~~ javascript
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReduxFetchResource, {FETCH_RESOURCE_START} from 'redux-fetch-resource';
import reducer from './reducers.js';

const myMiddleware = store => next => action => {
  if (action.type === FETCH_RESOURCE_START) {
    // do something before the request starts
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
