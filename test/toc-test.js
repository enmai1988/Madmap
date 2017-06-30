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
import Toc from '../react-client/src/components/toc.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TocIcon from 'material-ui/svg-icons/action/toc';
import SaveIcon from 'material-ui/svg-icons/file/cloud-upload';
import CreateIcon from 'material-ui/svg-icons/content/create';
import {grey50} from 'material-ui/styles/colors';

describe('Toc', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Toc />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <Toc />
        </MuiThemeProvider>
      );
      expect(wrapper.contains(
        <Toc />
      )).to.equal(true);
    });
    it('should be an Icon Menu', () => {
      expect(shallow(<Toc />).is('IconMenu')).to.equal(true);
    });
    it('mounting adds to our html', () => {
      expect(mount(
        <MuiThemeProvider>
          <Toc />
        </MuiThemeProvider>
      ).find('IconMenu').length).to.equal(1);
    });
    it('IconMenu should have MenuItems', () => {
      const wrapper = shallow(<Toc />);
      assert.isOk(wrapper.find('MenuItem').length);
    });
  });
});
