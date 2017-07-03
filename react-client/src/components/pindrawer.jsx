import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import PinCreator from './pincreator.jsx';
import FloatingButton from 'material-ui/FloatingActionButton';
import {transparent, cyan500} from 'material-ui/styles/colors';
import PinDrop from 'material-ui/svg-icons/maps/pin-drop';

export default class Drawers extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.styles = {
      button: { position: 'fixed', bottom: '1em' },
      drawer: { backgroundColor: transparent, marginTop: '15em', height: '15em', width: 80 }
    };
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
      <div>
        <FloatingButton
          onTouchTap={this.toggleDrawer}
          style={this.styles.button}
          mini={true}
        >
          <PinDrop />
        </FloatingButton>
        <Drawer
          open={this.state.isOpen}
          onRequestClose={this.handleClose}
          containerStyle={this.styles.drawer}
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