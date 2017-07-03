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
import {cyan500} from 'material-ui/styles/colors';
import randomColorPicker from './randomcolor.js';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 75,
    marginTop: '1.5em',
    marginLeft: '0.5em'
  },
  gridList: {
    width: 60,
    height: 200,
    overflowY: 'auto'
  },
};

const tiles = [
  <ActionFlightTakeoff color={cyan500}/>,
  <ActionHome color={cyan500}/>,
  <BeenHere color={cyan500}/>,
  <Hotel color={cyan500}/>,
  <Camera color={cyan500}/>,
  <Terrain color={cyan500}/>,
  <Restaurant color={cyan500}/>,
  <Bar color={cyan500}/>,
  <Pizza color={cyan500}/>,
  <Train color={cyan500}/>,
  <Mall color={cyan500}/>,
  <Grocery color={cyan500}/>
];

class PinCreator extends Component {
  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
  }

  handle(e) {
    e.preventDefault();
    this.props.onPinClick(this.getPinAttributes(e.target));
    this.props.close();
    console.log('123', this.getPinAttributes(e.target));
    console.log('4: ', e.target.tagName);
    console.log('pin: ', e.target);
  }

  getPinAttributes(node) {
    if (node.tagName === 'svg') {
      return this.getAttributesFromSvg(node);
    } else if (node.tagName === 'path') {
      return this.getAttributesFromPath(node);
    }
  }

  getAttributesFromSvg(node) {
    console.log('hey:', this.parsePinStyle(node));
    var styles = this.parsePinStyle(node);
    var pinAttributes = {
      path: node.firstChild.getAttribute('d'),
      fillOpacity: 1.0,
      fillColor: styles.fill,
      strokeColor: styles.color,
      strokeOpacity: 0.0,
      anchor: new window.google.maps.Point(10, 10)
    };
    return pinAttributes;
  }

  getAttributesFromPath(node) {
    var styles = this.parsePinStyle(node.parentNode);
    var pinAttributes = {
      path: node.getAttribute('d'),
      fillOpacity: 1.0,
      fillColor: styles.fill,
      strokeColor: styles.color,
      strokeOpacity: 0,
      anchor: {
        x: 10,
        y: 10
      }
    };
    return pinAttributes;
  }

  parsePinStyle(node) {
    var stylesArray = node.getAttribute('style').split('; ');
    var styles = {};
    stylesArray.forEach((style, index, stylesArray) => {
      var currentStyle = style.split(': ');
      styles[currentStyle[0]] = currentStyle[1];
    });
    return styles;
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
              <GridTile key={index} onTouchTap={(e) => this.handle(e)} >
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
