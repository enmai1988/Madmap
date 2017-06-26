import React from 'react';
import Map from 'google-maps-react';
import {GoogleApiWrapper} from 'google-maps-react';
import GOOGLE_API_KEY from '../google/googleAPI.js';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/Refreshindicator';
import Drawer from 'material-ui/Drawer';
import PinCreator from './pincreator.jsx';
import Popover from 'material-ui/Popover';
import FloatingSearchButton from 'material-ui/FloatingActionButton';
import Sherlock from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export class MapContainer extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: true,
      searchIsOpen: false
    };
    this.styles = {
      refresh: {
        position: 'relative'
      },
      mapFlexBox: {
        postition: 'relative',
        display: 'flex',
        width: '95%',
        height: '25em',
        paddingTop: '5em', 
        paddingRight: '2em' 
      },
      searchButton: {
        position: 'fixed',
        bottom: '1em',
        right: '1em'
      }
    };
  }

  handleSearchTap = (event) => {
    event.preventDefault();
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
      searchAnchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      searchIsOpen: false,
    });
  };

  render() {
    if (!this.props.loaded) {
      return (
        <RefreshIndicator 
          size={40} 
          left={10} 
          top={0} 
          status='loading'
          style={this.styles.refresh}
        />
      );
    }
    return (
      <div>
        <Drawer
          open={this.state.drawerIsOpen}
          containerStyle={{marginTop: '10em', height: '25em', width: 80, opacity: 1}}
        >
          <PinCreator style={{opacity: 1}}/>
        </Drawer>
        <Map google={this.props.google} style={this.styles.mapFlexBox} />
        <Popover
          open={this.state.searchIsOpen}
          anchorEl={this.state.searchAnchorEl}
          anchorOrigin={{"horizontal":"left","vertical":"bottom"}}
          targetOrigin={{"horizontal":"right","vertical":"bottom"}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem>
              <TextField hintText="Address" />
            </MenuItem>
          </Menu>
        </Popover>
        <FloatingSearchButton 
          style={this.styles.searchButton}
          mini={true}
          onTouchTap={this.handleSearchTap}
        >
          <Sherlock/>
        </FloatingSearchButton>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);