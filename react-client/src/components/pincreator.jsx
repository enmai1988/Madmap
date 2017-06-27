import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionRoom from 'material-ui/svg-icons/action/room';
import BeenHere from 'material-ui/svg-icons/maps/beenhere';
import Hotel from 'material-ui/svg-icons/maps/hotel';
import Camera from 'material-ui/svg-icons/maps/local-see';
import Terrain from 'material-ui/svg-icons/maps/terrain';
import Restaurant from 'material-ui/svg-icons/maps/restaurant';
import Bar from 'material-ui/svg-icons/maps/local-bar';
import Pizza from 'material-ui/svg-icons/maps/local-pizza';
import Train from 'material-ui/svg-icons/maps/train';
import Mall from 'material-ui/svg-icons/maps/local-mall';
import Grocery from 'material-ui/svg-icons/maps/local-grocery-store'; 

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 75
  },
  gridList: {
    width: 60,
    height: 200,
    overflowY: 'auto',
    border: '1px solid black'
  },
};

const tiles = [
  <ActionFlightTakeoff />,
  <ActionHome />,
  <BeenHere />,
  <Hotel />,
  <Camera />,
  <Terrain />,
  <Restaurant />,
  <Bar />,
  <Pizza />,
  <Train />,
  <Mall />,
  <Grocery />
];

class PinCreator extends Component {
  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
  }

  handle(e) {
    e.preventDefault();
    console.log('123', e.target);
    this.props.onPinClick(e);
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={24}
          style={styles.gridList} 
        >
          {tiles.map((tile, index) => {
            return (
              <GridTile key={index} onTouchTap={this.handle.bind(this)} >
                {tile}
              </GridTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}


export default PinCreator;