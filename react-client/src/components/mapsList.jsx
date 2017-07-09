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

    this.renderMap = this.renderMap.bind(this);
  }

  shareMap(emailAddress, mapId) {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    let mapUrl = null;

    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      mapUrl = `${protocol}//${hostname}:${port}?=${mapId}`;
    } else {
      mapUrl = `${protocol}//${hostname}?=${mapId}`;
    }

    axios({
      method: 'post',
      url: '/map/share',
      data: {
        emailAddress: emailAddress,
        mapUrl: mapUrl,
        user: this.props.currentUser
      }
    })
      .then(res => {})
      .catch(err => console.log(err));
  }

  renderMap(mapId) {
    var mapUrl;
    if (window.location.hostname === '127.0.0.1') {
      mapUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/?=' + mapId;
    } else {
      mapUrl = window.location.protocol + '//' + window.location.hostname + '/?=' + mapId;
    }
    window.location.assign(mapUrl);
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
                primaryText={<div onClick={() => this.renderMap(map.id)}> {map.name} </div>}
                key={index} />;
            })}
          </div>
        </List>
      </div>
    );
  }
}
