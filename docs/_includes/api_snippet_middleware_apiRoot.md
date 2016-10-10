
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### store.js
{: .Heading .Heading--filename }

~~~ javascript
import ReduxFetchResource from 'redux-fetch-resource';

// prepend with an absolute path
ReduxFetchResource({ apiRoot: '/api/v2' });

// Or with a url
ReduxFetchResource({ apiRoot: 'https://api.mydomain.com/v3/' });

~~~

</div>
