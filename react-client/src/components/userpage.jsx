import React, { Component } from 'react';
import FriendsList from './friendsList.jsx';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {
          id: 1,
          emailAddress: 'david@elovate.io',
          avatar: 'http://placehold.it/50x50'
        },
        {
          id: 2, 
          emailAddress: 'david-1@elovate.io',
          avatar: 'http://placehold.it/50x50'
        }
      ]
    };
  }

  render() {
    return (
      <FriendsList friends={this.state.friends} />
    );
  }
}
