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
import LoggedIn from '../react-client/src/components/loggedin.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

describe('LoggedIn', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<LoggedIn />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <LoggedIn />
        </MuiThemeProvider>
      );
      expect(wrapper.contains(
        <LoggedIn />
      )).to.equal(true);
    });
    it('should be an Icon Menu', () => {
      expect(shallow(<LoggedIn />).is('IconMenu')).to.equal(true);
    });
    it('mounting adds to our html', () => {
      expect(mount(
        <MuiThemeProvider>
          <LoggedIn />
        </MuiThemeProvider>
      ).find('IconMenu').length).to.equal(1);
    });
    it('IconMenu should have MenuItems', () => {
      const wrapper = shallow(<LoggedIn />);
      assert.isOk(wrapper.find('MenuItem').length);
    });
  });
});
