import React from 'react';
import Map from 'google-maps-react';
import {GoogleApiWrapper} from 'google-maps-react';
import GOOGLE_API_KEY from '../google/googleAPI.js';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';


export class MapContainer extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      hi: 'hi'
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
        paddingRight: '2em', 
      }
    };
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
      <Paper zDepth={4} >
        <Map google={this.props.google} style={this.styles.mapFlexBox}/>
      </Paper>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);