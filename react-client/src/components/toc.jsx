import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TocIcon from 'material-ui/svg-icons/action/toc';
import SaveIcon from 'material-ui/svg-icons/file/cloud-upload';
import CreateIcon from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
//import Divider from 'material-ui/Divider';
import {grey50} from 'material-ui/styles/colors';

class Toc extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.props.save();
          this.handleClose();
        }}
      />
    ];

    return (
      <div className="icon">
        <IconMenu
          iconButtonElement={
            <IconButton><TocIcon color={grey50} /></IconButton>
          }
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem onTouchTap={this.handleOpen}>
            <SaveIcon /> &nbsp;Save
          </MenuItem>
          <MenuItem>
            <CreateIcon /> &nbsp;New
          </MenuItem>
        </IconMenu>
        <Dialog
          title="Map Title"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Enter map title"
          /><br />
        </Dialog>
      </div>
    );
  }
}

export default Toc;
