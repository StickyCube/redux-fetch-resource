
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
   * Makes a PUT Request to http://mydomain.com/foo/create with a request body
   */
  onSubmitFoo: data => dispatch(FetchResource(
    '/foo/create',
    {
      method: 'PUT',
      body: data
    }
  )),

  /**
   * Makes a PUT Request to http://mydomain.com/bar/create with a request body
   * as a function which reads something from the state before sending
   */
  onSubmitBar: data => dispatch(FetchResource(
    '/bar/create',
    {
      method: 'PUT',
      body: function (getState) {
        return {
          ...data,
          otherThing: getState().thing
        }
      }
    }
  ))
})

@connect(null, mapDispatchToProps)
export default class MyComponent extends React.Component {
  /* Insert your magic here */
}
~~~

</div>
