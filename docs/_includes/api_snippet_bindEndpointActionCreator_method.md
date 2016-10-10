
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### actions.js
{: .Heading .Heading--filename }

~~~ javascript
import {bindEndpointActionCreator} from 'redux-fetch-resource';

// using the default method 'GET'
export const FetchUsers = bindEndpointActionCreator('/users');

// To use a different method, use the method option
export const CreateUser = bindEndpointActionCreator('/users/create', { method: 'PUT' });
~~~

</div>
