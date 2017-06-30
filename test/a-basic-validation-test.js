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
//react components
import Autocomplete from '../react-client/src/components/autocomplete.jsx';
import PinInfo from '../react-client/src/components/pininfo.jsx';
import Login from '../react-client/src/components/login.jsx';
//material-ui
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('BasicValidations', () => {
  describe('chai', () => {
    it('should be able to use chai assert commands', () => {
      var foo = 'bar';
      var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      assert.typeOf(foo, 'string'); // without optional message
      assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
      assert.equal(foo, 'bar', 'foo equal `bar`');
      assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
      assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
    });
    it('should be able to use chai should commands', () => {
      var foo = 'bar';
      var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      foo.should.be.a('string');
      foo.should.equal('bar');
      foo.should.have.lengthOf(3);
      beverages.should.have.property('tea').with.lengthOf(3);
    });
    it('should be able to use chai expect commands', () => {
      var foo = 'bar';
      var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.lengthOf(3);
      expect(beverages).to.have.property('tea').with.lengthOf(3);
    });
  });

  describe('react', () => {
    it('shallow mount should render one level deep dom elements', () => {
      const wrapper = shallow(<PinInfo />);
      assert.isOk(wrapper);
    });
    it('contains should return true if it is contained in the DOM', () => {
      const wrapper = mount(<PinInfo />);
      expect(mount(<PinInfo />).contains(<div>PinInfo</div>)).to.equal(true);
    });
    it('should match when calling element on dom', () => {
      expect(shallow(<PinInfo />).is('.pinInfo')).to.equal(true);
    });
    it('mounting a component should add to our html', () => {
      expect(mount(<PinInfo />).find('.pinInfo').length).to.equal(1);
    });
    it('calls render', () => {
      spy(PinInfo.prototype, 'render');
      const wrapper = mount(<PinInfo />);
      expect(PinInfo.prototype.render.calledOnce).to.equal(true);
    });
    it('allows us to set props', () => {
      const wrapper = mount(<Autocomplete bar="baz" />);
      expect(wrapper.props().bar).to.equal('baz');
      wrapper.setProps({ bar: 'foo' });
      expect(wrapper.props().bar).to.equal('foo');
    });
    it('simulates touchTap events', () => {
      const handleTouchTap = spy();
      const wrapper = shallow((
        <MuiThemeProvider>
          <FlatButton onTouchTap={handleTouchTap} label="login" />
        </MuiThemeProvider>
      ));
      wrapper.find('FlatButton').simulate('touchTap');
      expect(handleTouchTap.calledOnce).to.equal(true);
    });
    it('simulates touchTap events when mounted', () => {
      const handleTouchTap = spy();
      const wrapper = mount(
        <MuiThemeProvider>
          <FlatButton onTouchTap={handleTouchTap} label="login" />
        </MuiThemeProvider>
      );
      // Use the Node property of the Wrapped Element to expose the component instance
      ReactTestUtils.Simulate.touchTap(ReactDOM.findDOMNode(wrapper.find('FlatButton').node));
      expect(handleTouchTap.calledOnce).to.equal(true);
    });
  });
});
