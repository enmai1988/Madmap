import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import AutoComplete from 'material-ui/AutoComplete';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="friend_list">
        <List>
          <Subheader>My Friends</Subheader>
          {this.props.friends.map((friend, index) => {
            return <ListItem
              leftAvatar={<Avatar src={friend.avatar} />}
              primaryText={`${friend.firstname} ${friend.lastname}`}
              key={index} />;
          })}
        </List>
      </div>
    );
  }
}
