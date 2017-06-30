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
import Login from '../react-client/src/components/login.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

describe('Login', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Login />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount((
        <MuiThemeProvider>
          <Login />
        </MuiThemeProvider>
      ));
      expect(wrapper.contains(<Login />)).to.equal(true);
    });
    it('mounting adds to our html', () => {
      const wrapper = mount((
        <MuiThemeProvider>
          <Login />
        </MuiThemeProvider>
      ));
      expect(wrapper.find('FlatButton').length).to.equal(1);
    });
    it('calls render when mounting', () => {
      spy(Login.prototype, 'render');
      const wrapper = mount(
        <MuiThemeProvider>
          <Login />
        </MuiThemeProvider>
      );
      expect(Login.prototype.render.calledOnce).to.equal(true);
    });
    it('Login\'s FlatButton should be capable of handling a touchTap', () => {
      const handleTouchTap = spy();
      const wrapper = mount(
        <MuiThemeProvider>
          <Login />
        </MuiThemeProvider>
      );
      wrapper.find('Login').node.handleTouchTap = handleTouchTap;
      wrapper.update();
      ReactTestUtils.Simulate.touchTap(ReactDOM.findDOMNode(wrapper.find('FlatButton').node));
      expect(handleTouchTap.calledOnce).to.equal(true);
    });
    it('Login should have a Popover', () => {
      const wrapper = shallow(<Login />);
      assert.isOk(wrapper.find('Popover').length);
    });
    it('Login should have MenuItems in the Popover', () => {
      const wrapper = shallow(<Login />);
      assert.isOk(wrapper.find('MenuItem').length);
    });
  });
});
