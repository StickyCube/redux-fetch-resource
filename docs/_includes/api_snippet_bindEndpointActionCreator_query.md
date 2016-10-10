
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### action-reducer.js
{: .Heading .Heading--filename }
~~~ javascript
import {combineReducers} from 'redux';
import {bindEndpointActionCreator} from 'redux-fetch-resource';

const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export const FetchUsers = bindEndpointActionCreator('/users', { successType: FETCH_USERS_SUCCESS });

export const reducer = ({
  users (state = [], action) {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return action.payload.body;
      default:
        return state;
    }
  }
})
~~~

#### UserList.jsx
{: .Heading .Heading--filename }

~~~ javascript
import React from 'react';
import {connect} from 'react-redux';
import {FetchUsers} from './actions';

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: search => dispatch(FetchUsers({ query: { q: search } }))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component {
  onSubmit () {
    this.props.fetchUsers(
      this.refs.search.value
    );
  }

  render () {
    return (
      <div>
        <input ref='search' type='text' />
        <button onClick={() => this.onSubmit()} >Search</button>
        <ul>
        {this.props.users.map(user => (
          <li key={user.id} >
          {user.name}
          </li>
        ))}
        </ul>
      </div>
    )
  }
}
~~~

</div>
