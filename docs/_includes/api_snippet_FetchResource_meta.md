
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### MyComponent.jsx
{: .Heading .Heading--filename }

~~~ javascript
import React from 'react';
import {connect} from 'react-redux';
import {FetchResource} from 'redux-fetch-resource';
import {FETCH_USERS_SUCCESS} from './ActionReducer.js';

const mapDispatchToProps = dispatch => ({
  /**
   * Make a GET request to http://mydomain.com/users and use the meta option to
   * instruct a custom store middleware to normalize the result payload.
   */
  fetchUsers: () => dispatch(
    FetchResource(
      '/users',
      {
        meta: { normalizeResult: true }
        successType: FETCH_USERS_SUCCESS
      }
    )
  )
})

@connect(null, mapDispatchToProps)
export default class MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~

### NormalizerMiddleware.js
{: .Heading .Heading--filename }

~~~ javascript
export default store => next => action => {
  if (action.meta && action.meta.normalizeResult) {
    // normalize the action.payload.body
  }

  return next(action);
}
~~~

</div>
