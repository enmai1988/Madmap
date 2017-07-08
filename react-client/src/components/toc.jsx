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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import style from './style.js';

class Toc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialogValue: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChange(e) {
    this.setState({ dialogValue: e.target.value });
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
          this.props.save(this.state.dialogValue);
          this.handleClose();
        }}
      />
    ];

    return (
      <div>
        {/* <IconMenu
          iconButtonElement={
            <IconButton><TocIcon color={grey50} /></IconButton>
          }
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem onTouchTap={this.handleOpen}>
            <SaveIcon /> &nbsp;Save
          </MenuItem>
        </IconMenu> */}
        <FloatingActionButton
          mini={true}
          style={style.saveMapIcon}
          onTouchTap={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Map Title"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Enter map title"
            value={this.state.dialogValue}
            onChange={this.handleChange}
          /><br />
        </Dialog>
      </div>
    );
  }
}

export default Toc;
