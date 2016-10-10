
Show Example
{: .Button--exampleToggle }

<div markdown="1" >

#### action-reducer.js
{: .Heading .Heading--filename }
~~~ javascript
import {combineReducers} from 'redux';
import {bindEndpointActionCreator} from 'redux-fetch-resource';

const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export const FetchUsers = bindEndpointActionCreator('/users/:team', { successType: FETCH_USERS_SUCCESS });

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
  fetchUsers: team => dispatch(FetchUsers({ params: { team } }))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component {
  componentDidMount () {
    this.props.fetchUsers(
      this.props.teamId
    );
  }

  render () {
    return (
      <ul>
        {this.props.users.map(user => (
          <li key={user.id} >
            {user.name}
          </li>
        ))}
      </ul>
    )
  }
}
~~~

</div>
