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
      users: []
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
        console.log('maps response data: ', res.data);
        this.setState({
          maps: res.data
        })
      })
      .catch(err => console.log('error:', err));
  }

  render() {
    return (
      <div id="user_page_components">
        <FriendsList friends={this.state.friends} />
        <MapsList maps={this.state.maps} />
      </div>
    );
  }
}
