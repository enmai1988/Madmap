import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import PinCreator from './pincreator.jsx';
import FloatingButton from 'material-ui/FloatingActionButton';
import {transparent, cyan500} from 'material-ui/styles/colors';
import PinDrop from 'material-ui/svg-icons/maps/pin-drop';
import style from './style.js';

export default class Drawers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleDrawer() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClose () {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <div id="pin_drawer">
        <FloatingButton
          onTouchTap={this.toggleDrawer}
          style={style.pinDrawer.button}
          mini={true}
        >
          <PinDrop />
        </FloatingButton>
        <Drawer
          open={this.state.isOpen}
          onRequestClose={this.handleClose}
          containerStyle={style.pinDrawer.drawer}
        >
          <PinCreator
            onPinClick={this.props.onPinClick}
            close={this.handleClose}
          />
        </Drawer>
      </div>
    );
  }
}
