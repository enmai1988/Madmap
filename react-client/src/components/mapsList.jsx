import React, { Component } from 'react';
import axios from 'axios';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SocialShare from 'material-ui/svg-icons/social/share';
import Subheader from 'material-ui/Subheader';

export default class MapsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shareMap(emailAddress, mapId) {
    axios({
      method: 'post',
      url: '/map/share',
      data: {
        emailAddress: emailAddress,
        mapUrl: 'http://127.0.0.1:3000' + '?=' + mapId
      }
    })
      .then(res => {})
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="map_component">
        <List>
          <h3>My Maps</h3>
          <div className="map_list">
            {this.props.maps.map((map, index) => {
              return <ListItem
                rightAvatar={
                  <IconMenu
                    iconButtonElement={<IconButton><SocialShare /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  >
                    {this.props.friends.map((friend, index) => {
                      return <MenuItem primaryText={friend.email} key={index} onClick={() => this.shareMap(friend.email, map.id)} />;
                    })}
                  </IconMenu>
                }
                primaryText={`${map.name}`}
                key={index} />;
            })}
          </div>
        </List>
      </div>
    );
  }
}