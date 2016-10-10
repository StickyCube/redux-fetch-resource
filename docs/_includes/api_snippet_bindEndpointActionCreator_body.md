
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### actions.js
{: .Heading .Heading--filename }
~~~ javascript
import {bindEndpointActionCreator} from 'redux-fetch-resource';

export const CreateUser = bindEndpointActionCreator('/users/create', { method: 'PUT' });
~~~

#### CreateUserForm.jsx
{: .Heading .Heading--filename }
~~~ javascript
import React from 'react';
import {connect} from 'react-redux';
import {CreateUser} from './actions.js';

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(CreateUser({ body: data }));
})

@connect(null, mapDispatchToProps)
export default class CreateUserForm extends React.Component {
  submitForm () {
    return this.props.onSubmit({
      username: this.refs.name.value
    });
  }

  render () {
    return (
      <div>
        <input ref='name' type='text' placeholder='name' />
        <button onClick={() => this.submitForm()} >Submit</button>
      </div>
    );
  }
}
~~~

</div>
