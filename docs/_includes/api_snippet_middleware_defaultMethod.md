
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

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    ReduxFetchResource({ defaultMethod: 'POST' })
  )
)
~~~

</div>
