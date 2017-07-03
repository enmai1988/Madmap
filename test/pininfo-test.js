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
import PinInfo from '../react-client/src/components/pininfo.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

describe('PinInfo', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<PinInfo />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount((
        <MuiThemeProvider>
          <PinInfo />
        </MuiThemeProvider>
      ));
      expect(wrapper.contains(<PinInfo />)).to.equal(true);
    });
    it('mounting adds to our html', () => {
      const wrapper = mount((
        <MuiThemeProvider>
          <PinInfo />
        </MuiThemeProvider>
      ));
      expect(wrapper.find('Paper').length).to.equal(1);
    });
    it('calls render when mounting', () => {
      spy(PinInfo.prototype, 'render');
      const wrapper = mount(
        <MuiThemeProvider>
          <PinInfo />
        </MuiThemeProvider>
      );
      expect(PinInfo.prototype.render.calledOnce).to.equal(true);
    });
    it('PinInfo\'s TextField should be capable of handling an onChange', () => {
      const textChange = spy();
      const muiTheme = getMuiTheme();
      const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
      const mountWithContext = (node) => mount(node, {
        context: {muiTheme},
        childContextTypes: {muiTheme: PropTypes.object},
      });
      const wrapper = shallowWithContext(
      <TextField
        onChange={textChange}
        id="unique"
      />
    );
      // wrapper.find('TextField').simulate('change');
      wrapper.find('input').simulate('change', {target: {value: 'changed input'}});

      // wrapper.find('TextField').node.value = 'something different';
      // wrapper.update();
      expect(textChange.calledOnce).to.equal(true);
    });
    it('PinInfo should have a Paper', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <PinInfo />
        </MuiThemeProvider>
      );
      assert.isOk(wrapper.find('Paper').length);
    });
    it('PinInfo should have TextField in Paper', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <PinInfo />
        </MuiThemeProvider>
      );
      assert.isOk(wrapper.find('TextField').length);
    });
  });
});
