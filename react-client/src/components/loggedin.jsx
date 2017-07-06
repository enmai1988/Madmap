import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';

const LoggedIn = (props) => (
  <div>
    <TextField id="map_name_input" hintText="Add Title"/>
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <Link to='/profile'>
        <MenuItem primaryText="Profile" />
      </Link>
      <MenuItem primaryText="Help" />
      <Divider />
      <MenuItem primaryText="Sign out" />
    </IconMenu>
  </div>
);



LoggedIn.muiName = 'IconMenu';

export default LoggedIn;
