//TEST SAMPLE

//import chai
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

//import enzyme
import { mount, shallow, render } from 'enzyme';
//import the React stuff you need to test
import React from 'react';
import PinInfo from '../react-client/src/components/pininfo.jsx';

//describe shows title in white text when you run your test
describe('BasicValidations', () => {
  describe('react', () => {
    //it shows texts in dark grey with a green check as pass or red X as fail
    it('shallow copy of PinInfo should render one level deep DOM elements', () => {
      const wrapper = shallow(<PinInfo />); //enzyme's shallow renders your DOM one level deep
      assert.ok(wrapper);
    });
    it('contains should return true if it is contained in the DOM', () => {
      const wrapper = mount(<PinInfo />); // mount will actually mount your component to our JSDOM environment
      expect(mount(<PinInfo />).contains(<div>PinInfo</div>)).to.equal(true);
    });

    it('should match when calling element on DOM', () => {
      expect(shallow(<PinInfo />).is('.pinInfo')).to.equal(true);
    });

    it('mounting a component should add to our html', () => {
      expect(mount(<PinInfo />).find('.pinInfo').length).to.equal(1);
    });
  });
});

//helpful links:
//https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
//https://github.com/airbnb/enzyme
