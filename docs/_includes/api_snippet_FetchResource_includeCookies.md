
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
  /**
   * Make a GET request to http://mydomain.com/users with no cookies
   * NOTE:
   *  - This is the default behaviour
   */
  fetchUsers: () => dispatch(
    FetchResource('/users', { includeCookies: false })
  ),

  /**
   * Make a GET request to http://mydomain.com/users with cookies for this domain
   */
  fetchMessages: () => dispatch(
    FetchResource('/messages', { includeCookies: true })
  ),

  /**
   * Make a GET request to http://mydomain.com/users with cookies and cors enabled
   */
  fetchSettings: () => dispatch(
    FetchResource('/settings', { includeCookies: 'cors' })
  )
});

@connect(null, mapDispatchToProps)
export default class MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~

</div>
