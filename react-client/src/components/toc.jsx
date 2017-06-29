import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TocIcon from 'material-ui/svg-icons/action/toc';
import SaveIcon from 'material-ui/svg-icons/file/cloud-upload';
import CreateIcon from 'material-ui/svg-icons/content/create';
//import Divider from 'material-ui/Divider';
import {grey50} from 'material-ui/styles/colors'; 

class Toc extends Component {
  static muiName = "IconMenu"
  print = () => {
    console.log('hi');
  }

  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton><TocIcon color={grey50}/></IconButton>
        }
        anchorOrigin={{horizontal:"left", vertical:"bottom"}}
        targetOrigin={{horizontal:"left", vertical:"top"}}
      >
        <MenuItem onTouchTap={this.props.save}>
          <SaveIcon /> &nbsp;Save
        </MenuItem>
        <MenuItem>
          <CreateIcon /> &nbsp;New
        </MenuItem>
      </IconMenu>
    )
  }
};

export default Toc;