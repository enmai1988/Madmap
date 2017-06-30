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
import Header from '../react-client/src/components/header.jsx';
import LoggedIn from '../react-client/src/components/loggedin.jsx';
import Login from '../react-client/src/components/login.jsx';
import Toc from '../react-client/src/components/toc.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import TocIcon from 'material-ui/svg-icons/action/toc';
import FileCloudUpload from 'material-ui/svg-icons/file/cloud-upload';

describe('Header', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Header />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount((
        <MuiThemeProvider>
          <Header />
        </MuiThemeProvider>
      ));
      expect(wrapper.contains(<Header />)).to.equal(true);
    });
    it('mounting adds AppBar to our html', () => {
      expect(mount(
        <MuiThemeProvider>
        <Header />
        </MuiThemeProvider>
      ).find('AppBar').length).to.equal(1);
    });
    it('calls render when mounting', () => {
      spy(Header.prototype, 'render');
      const wrapper = mount(
        <MuiThemeProvider>
          <Header />
        </MuiThemeProvider>
      );
      expect(Header.prototype.render.calledOnce).to.equal(true);
    });
  });
});
