// component not being used anywhere - Think of deleting it

import React from 'react';
import {Marker} from 'google-maps-react';

export class Markers extends React.Component { 
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <span>
        {this.props.markers.map((marker, index, markers) => {
          console.log('markers: ', index, marker);
          return (
            <Marker
              key={index}
              position={marker.position}/>
          );
        })}
      </span>
    );
  }
}


export default Markers;