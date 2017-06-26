import React from 'react';
import Map from 'google-maps-react';
// import Map from './map.jsx';
import {GoogleApiWrapper} from 'google-maps-react';
import GOOGLE_API_KEY from '../google/googleAPI.js';
import Paper from 'material-ui/Paper';


export class MapContainer extends React.Component { 

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    const style = {
      width: '400px',
      height: '400px'
    };
    return (
    <Paper zDepth={4} className="mapContainer" style={style}>
      <Map google={this.props.google} style={style}/>
    </Paper>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);