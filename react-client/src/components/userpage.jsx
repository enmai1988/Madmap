import React, { Component } from 'react';
import axios from 'axios';
import FriendsList from './friendsList.jsx';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
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
      <FriendsList friends={this.state.friends} />
    );
  }
}
