import React from 'react';
import ReactDOM from 'react-dom';
import Map from 'google-maps-react';
import AutocompleteInput from './autocomplete.jsx';
import {GoogleApiWrapper, Marker} from 'google-maps-react';
import GOOGLE_API_KEY from '../google/googleAPI.js';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import PinCreator from './pincreator.jsx';
import Popover from 'material-ui/Popover';
import FloatingSearchButton from 'material-ui/FloatingActionButton';
import Sherlock from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PinSelection from './pindrawer.jsx';

export class MapContainer extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: true,
      searchIsOpen: false,
      pin: false,
      currentCenter: {
        lat: 44,
        lng: -122
      },
      zoom: 15,
      centerAroundCurrentLocation: true,
      currentPlace: null,
      markers: [],
      markerOn: false
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
    // console.log('event: ', clickEvent);
    if (this.state.markerOn) {
      // console.log(this.props.children);
      var markers = this.state.markers;
      markers.push({
        position: clickEvent.latLng
        // icon: {
        //   path: 
        // }
      });
      this.setState({
        markers: markers,
        markerOn: false
      });
      // console.log(this.state.markers);
    }
  }

  mapReady(mapProps, map) {
    window.map = map;
    this.setMapStateCenter();
    this.setState({
      currentPlacePosition: this.state.currentCenter
    });
    // console.log('center: ', this.state.zoom);
  }

  centerMoved(mapProps, map) {
    this.setMapStateCenter();
    console.log('center: ', this.state.zoom);
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
  
  selectPin(e) {
    this.setState({
      markerOn: !this.state.markerOn
    });
  }

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
        <AutocompleteInput
          google={this.props.google} 
          searchPlace={this.searchLocation.bind(this)}/>
        <Map google={this.props.google} style={this.styles.mapFlexBox}
          onClick={this.handleClick.bind(this)}
          centerAroundCurrentLocation={this.state.centerAroundCurrentLocation}
          onReady={this.mapReady.bind(this)}
          onDragend={this.centerMoved.bind(this)}>
          {this.state.markers.map((marker, index, markers) => {
            console.log('markers: ', index, marker);
            return (
              <Marker
                key={index}
                position={marker.position}/>
            );
          })}
          <Marker position={this.state.currentPlacePosition}
            name={'Joes sandwich'}/>
        </Map>
        <PinSelection onPinClick={this.selectPin.bind(this)} />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);