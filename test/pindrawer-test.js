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
import Drawers from '../react-client/src/components/pindrawer.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {transparent, cyan500} from 'material-ui/styles/colors';
import PinDrop from 'material-ui/svg-icons/maps/pin-drop';


describe('Drawers', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Drawers />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <Drawers />
        </MuiThemeProvider>
      );
      expect(wrapper.contains(
        <Drawers />
      )).to.equal(true);
    });
    it('should have Drawer', () => {
      const wrapper = shallow(<Drawers />);
      assert.isOk(wrapper.find('Drawer').length);
    });
    it('should include a PinCreator', () => {
      const wrapper = shallow(<Drawers />);
      assert.isOk(wrapper.find('PinCreator').length);
    });
    it('mounting adds to our html', () => {
      expect(mount(
        <MuiThemeProvider>
          <Drawers />
        </MuiThemeProvider>
      ).find('Drawer').length).to.equal(1);
    });
    it('FloatingActionButton should be capable of handling a touchTap', () => {
      const toggleDrawer = spy();
      const wrapper = shallow(
        <MuiThemeProvider>
          <FloatingActionButton onTouchTap={toggleDrawer} />
        </MuiThemeProvider>
      );
      wrapper.find('FloatingActionButton').simulate('touchTap');
      expect(toggleDrawer.calledOnce).to.equal(true);
    });
    it('Drawer should be capable of handling a requestClose event', () => {
      const handleClose = spy();
      const wrapper = shallow(
        <MuiThemeProvider>
          <Drawer onRequestClose={handleClose}/>
        </MuiThemeProvider>
      );
      wrapper.find('Drawer').simulate('requestClose');
      expect(handleClose.calledOnce).to.equal(true);
    });
    it('PinCreator should be capable of handling a pinClick event', () => {
      const pinClick = spy();
      const wrapper = shallow(
        <MuiThemeProvider>
          <PinCreator onPinClick={pinClick}/>
        </MuiThemeProvider>
      );
      wrapper.find('PinCreator').simulate('pinClick');
      expect(pinClick.calledOnce).to.equal(true);
    });
  });
});
