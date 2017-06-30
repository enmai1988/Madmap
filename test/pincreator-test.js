//chai
import { assert, expect } from 'chai';
import should from 'chai/register-should';
//sinon
import { spy } from 'sinon';
//enzyme
import { mount, shallow, render } from 'enzyme';
//react utils
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
//react component
import PinCreator from '../react-client/src/components/pincreator.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

describe('PinCreator', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<PinCreator />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <PinCreator />
        </MuiThemeProvider>
      );
      expect(wrapper.contains(
        <PinCreator />
      )).to.equal(true);
    });
    it('should have a Grid List', () => {
      const wrapper = shallow(<PinCreator />);
      assert.isOk(wrapper.find('GridList').length);
    });
    it('should have Grid Tiles', () => {
      const wrapper = shallow(<PinCreator />);
      assert.isOk(wrapper.find('GridTile').length);
    });
    it('mounting adds to our html', () => {
      expect(mount(
        <MuiThemeProvider>
          <PinCreator />
        </MuiThemeProvider>
      ).find('GridList').length).to.equal(1);
    });
    it('PinCreator\'s GridTile should be capable of handling a touchTap', () => {
      const handleTouchTap = spy();
      const wrapper = mount(
        <MuiThemeProvider>
          <PinCreator />
        </MuiThemeProvider>
      );
      wrapper.find('PinCreator').node.handle = handleTouchTap;
      wrapper.update();
      ReactTestUtils.Simulate.touchTap(ReactDOM.findDOMNode(wrapper.find('GridTile').node));
      expect(handleTouchTap.calledOnce).to.equal(true);
    });
  });
});
