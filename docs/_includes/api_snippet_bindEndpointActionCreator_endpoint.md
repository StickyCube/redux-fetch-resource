
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### actions.js
{: .Heading .Heading--filename }

~~~ javascript
import {bindEndpointActionCreator} from 'redux-fetch-resource';

// using a relative path
export const FetchUsers = bindEndpointActionCreator('users');

// using an absolute path
export const FetchGroups = bindEndpointActionCreator('/groups');

// with parameters
export const FetchMessages = bindEndpointActionCreator('/messages/:thread_id');

// with optional parameters
export const FetchSettings = bindEndpointActionCreator('/settings(/:type)');
~~~

</div>
