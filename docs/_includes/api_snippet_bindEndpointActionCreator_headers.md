
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### actions.js
{: .Heading .Heading--filename }

~~~ javascript
import {bindEndpointActionCreator} from 'redux-fetch-resource';

// Using a function
export const CreateGroup = bindEndpointActionCreator(
  '/groups',
  {
    method: 'PUT',
    headers (getState) {
      return {
        Authorization: 'Bearer ' + getState().user.token
      };
    }
  }
);

// Or as an object
export const FetchPosts = bindEndpointActionCreator(
  '/posts',
  {
    headers: {
      'Contnet-Type': 'application/json',
      'X-Pagination-from': 50,
      'X-Pagination-limit': 25
    }
  }
);
~~~

</div>
