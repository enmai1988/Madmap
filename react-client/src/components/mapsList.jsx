import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class MapsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="maps_list">
        <List>
          <Subheader>My Maps</Subheader>
          {this.props.maps.map((map, index) => {
            return <ListItem
              primaryText={`${map.name}`}
              key={index} />;
          })}
        </List>
      </div>
    );
  }
}