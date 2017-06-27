import React from 'react';
import ReactDOM from 'react-dom';
import Map from 'google-maps-react';
import AutocompleteInput from './autocomplete.jsx';
import {GoogleApiWrapper} from 'google-maps-react';
import GOOGLE_API_KEY from '../google/googleAPI.js';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
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
      searchIsOpen: false,
      currentCenter: {
        lat: 44,
        lng: -122
      },
      zoom: 15,
      centerAroundCurrentLocation: true,
      currentPlace: null,
      currentPlacePosition: null
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

  handleSearchTap(event) {
    event.preventDefault();
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
      searchAnchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      searchIsOpen: false,
    });
  }

  setMapStateCenter() {
    this.setState({
      currentCenter: window.map.getCenter(),
      zoom: window.map.getZoom()
    });
  }
  
  searchLocation(place, map) {
    if (!place.geometry) { return; }
    
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    
    this.setMapStateCenter();
    this.setState({
      currentPlace: place,
      currentPlacePosition: place.geometry.location
    });
  }

  handleClick(mapProps, map, clickEvent) {
    console.log('event: ', clickEvent);
  }

  mapReady(mapProps, map) {
    window.map = map;
    this.setMapStateCenter();
    console.log('center: ', this.state.zoom);
  }

  centerMoved(mapProps, map) {
    this.setMapStateCenter();
    console.log('center: ', this.state.zoom);

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
        <AutocompleteInput
          google={this.props.google} 
          searchPlace={this.searchLocation.bind(this)}/>
        <Map google={this.props.google} style={this.styles.mapFlexBox}
          onClick={this.handleClick.bind(this)}
          centerAroundCurrentLocation={this.state.centerAroundCurrentLocation}
          onReady={this.mapReady.bind(this)}
          onDragend={this.centerMoved.bind(this)}/>
        <Popover
          open={this.state.searchIsOpen}
          anchorEl={this.state.searchAnchorEl}
          anchorOrigin={{'horizontal': 'left', 'vertical': 'bottom'}}
          targetOrigin={{'horizontal': 'right', 'vertical': 'bottom'}}
          onRequestClose={this.handleRequestClose.bind(this)}
          style={{height: 250}}
        >
          <Menu>
          </Menu>
        </Popover>
        <FloatingSearchButton 
          style={this.styles.searchButton}
          mini={true}
          onTouchTap={this.handleSearchTap.bind(this)}

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