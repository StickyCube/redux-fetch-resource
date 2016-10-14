
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
   * Make a GET request to http://mydomain.com/things
   */
  fetchThings: () => dispatch(
    FetchResource('/things')
  )
});

@connect(null, mapDispatchToProps);
export default class MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~

</div>
