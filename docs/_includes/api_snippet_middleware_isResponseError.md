
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### store.js
{: .Heading .Heading--filename }

~~~ javascript
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReduxFetchResource from 'redux-fetch-resource';
import reducer from './reducers';

function isResponseError (response, body) {
  return (
    !response.ok ||
    body.isError
  );
}

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource({ isResponseError })
  )
)
~~~

</div>
