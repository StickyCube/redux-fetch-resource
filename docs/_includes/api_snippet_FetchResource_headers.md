
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### MyComponent.jsx
{: .Heading .Heading--filename }

~~~ javascript
import React from 'react';
import {connect} from 'connect';
import {FetchResource} from 'redux-fetch-resource';

/**
 * NOTE:
 *  - Headers can be specified in the middleware config and will be merged.
 *  - Headers from middleware will be overridden by ones declared here.
 */

const mapDispatchToProps = dispatch => ({
  /**
   * Makes a GET request to http://mydomain.com/settings with the Authorization
   * header declared using an object.
   */
  fetchSettings: () => dispatch(FetchResource(
    '/settings',
    {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
  )),

  /**
   * Makes a GET request to http://mydomain.com/things with the X-Pagination-Token
   * header declared using a function which reads some state from the store.
   */
  fetchThings: () => dispatch(FetchResource(
    '/things',
    {
      headers (getState) {
        return {
          'X-Pagination-Token': getState().things.nextPageToken
        }
      }
    }
  ))
});

@connect(null, mapDispatchToProps)
export default MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~

</div>
