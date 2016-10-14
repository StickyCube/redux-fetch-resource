
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### MyComponent.jsx
{: .Heading .Heading--filename }

~~~ javascript
import React from 'react';
import {connect} from 'react-redux';
import {FetchResource} from 'redux-fetch-resource';

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(FetchResource(
    '/users',
    {
      onStart: function (request, dispatch, getState) {
        // Do something before the request starts.
      },
      onSuccess: function (response, dispatch, getState) {
        // Do something on a successful response.
      },
      onError: function (error, dispatch, getState) {
        // Do something when the bad thing happens.
      }
    }
  ))
});

@connect(null, mapDispatchToProps)
export default class MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~

</div>
