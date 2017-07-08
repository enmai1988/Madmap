import React, { Component } from 'react';
import axios from 'axios';
import FriendsList from './friendsList.jsx';
import MapsList from './mapsList.jsx';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      friends: [],
      users: [],
      maps: []
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

    axios.get(`/maps/${this.props.currentUser.id}`)
      .then((res) => {
        this.setState({
          maps: res.data
        });
      })
      .catch(err => console.log('error:', err));
  }

  render() {
    return (
      <div className="user_page">
        <MapsList friends={this.state.friends} maps={this.state.maps} />
        <FriendsList currentUser={this.props.currentUser} getFriends={this.getFriends.bind(this)} friends={this.state.friends} users={this.state.users} />
      </div>
    );
  }
}
