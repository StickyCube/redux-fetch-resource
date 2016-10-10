
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### action-reducer.js
{: .Heading .Heading--filename }

~~~ javascript
import {bindEndpointActionCreator} from 'redux-fetch-resource';

// For secondary actions: action.meta.foo === true
export const FetchUsers = bindEndpointActionCreator(
  '/users',
  {
    meta: { foo: true }
  }
);


// For secondary actions: action.meta.foo === false
export const CreateUser = bindEndpointActionCreator(
  '/users/create',
  {
    method: 'PUT',
    meta: { foo: false  }
  }
)

~~~

</div>
