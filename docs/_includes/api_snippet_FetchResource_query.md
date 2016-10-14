
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### action-reducer.js
{: .Heading .Heading--filename }

~~~ javascript
import React from 'react';
import {connect} from 'react-redux';
import {FetchResource} from 'redux-fetch-resource';

const mapDispatchToProps = dispatch => ({
  /**
   * Make a GET request to http://mydomain.com/users?type=adminUser
   */  
  fetchAdmins: () => dispatch(FetchResource(
    '/users',
    {
      query: {
        type: 'adminUser'
      }
    }
  ))

  /**
   * Make a GET request to http://mydomain.com/users?type=basicUser&page=123
   * using a function to read some state to build the query
   */
  fetchUsers: () => dispatch(FetchResource(
    '/users',
    {
      query: function (getState) {
        return {
          type: 'basicUser',
          page: getState().users.page
        };
      }
    }
  ))
})

@connect(null, mapDispatchToProps)
export default MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~
</div>
