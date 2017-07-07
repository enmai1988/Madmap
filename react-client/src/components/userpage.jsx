import React, { Component } from 'react';
import axios from 'axios';
import FriendsList from './friendsList.jsx';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      friends: [],
      users: []
    };
  }

  componentDidMount() {
    axios.get('/user/')
      .then((res) => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log('error:', err));

    this.getFriends();
  }

  getFriends() {
    axios.get(`/friend/${this.props.currentUser.id}`)
      .then((res) => {
        this.setState({
          friends: res.data
        });
      })
      .catch(err => console.log('error:', err));
  }

  render() {
    return (
      <FriendsList currentUser={this.props.currentUser} getFriends={this.getFriends.bind(this)} friends={this.state.friends} users={this.state.users} />
    );
  }
}
