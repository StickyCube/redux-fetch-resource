
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### actions.js
{: .Heading .Heading--filename }

~~~ javascript
import {bindEndpointActionCreator} from 'redux-fetch-resource';

// By default, no cookies are sent
export const FetchUsers = bindEndpointActionCreator('/users', { includeCookies: false });

// Include cookies on requests on the same domain
export const FetchMessages = bindEndpointActionCreator('/messages', { includeCookies: true });

// Include cookies on requests not on the same domain
export const FetchSettings = bindEndpointActionCreator('/settings', { includeCookies: 'cors' });
~~~

</div>
