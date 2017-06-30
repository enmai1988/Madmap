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
import Autocomplete from '../react-client/src/components/autocomplete.jsx';
//material-ui
import MenuItem from 'material-ui/MenuItem';

describe('Autocomplete', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Autocomplete />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount(<Autocomplete />);
      expect(mount(<Autocomplete />).contains(
        <input
        type="text"
        ref="autocomplete"/>
      )).to.equal(true);
    });
    it('should be an input bar', () => {
      expect(shallow(<Autocomplete />).is('input')).to.equal(true);
    });
    it('mounting adds to our html', () => {
      expect(mount(<Autocomplete />).find('input').length).to.equal(1);
    });
    it('calls componentDidMount when mounting', () => {
      spy(Autocomplete.prototype, 'componentDidMount');
      const wrapper = mount(<Autocomplete />);
      expect(Autocomplete.prototype.componentDidMount.calledOnce).to.equal(true);
    });
    it('calls render when mounting', () => {
      spy(Autocomplete.prototype, 'render');
      const wrapper = mount(<Autocomplete />);
      expect(Autocomplete.prototype.render.calledOnce).to.equal(true);
    });
    it('calls componentDidUpdate on property change', () => {
      spy(Autocomplete.prototype, 'componentDidUpdate');
      const wrapper = mount(<Autocomplete searchPlace={'something'}/>);
      wrapper.setProps({ searchPlace: 'changed location'});
      expect(Autocomplete.prototype.componentDidUpdate.calledOnce).to.equal(true);
    });
  });
});
