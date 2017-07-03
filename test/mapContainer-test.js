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
import MapContainer from '../react-client/src/components/mapContainer.jsx';
import PinCreator from '../react-client/src/components/pincreator.jsx';
import PinSelection from '../react-client/src/components/pindrawer.jsx';
import AutocompleteInput from '../react-client/src/components/autocomplete.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Popover from 'material-ui/Popover';
import FloatingSearchButton from 'material-ui/FloatingActionButton';
import Sherlock from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
//google stuff
import Map from 'google-maps-react';
import {GoogleApiWrapper, Marker} from 'google-maps-react';

describe('MapContainer', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<MapContainer />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount((
        <MuiThemeProvider>
          <MapContainer />
        </MuiThemeProvider>
      ));
      expect(wrapper.contains(<MapContainer />)).to.equal(true);
    });
    it('mounting adds to our html', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <MapContainer />
        </MuiThemeProvider>
      );
      expect(wrapper.find('MapContainer').length).to.equal(1);
    });
    it('calls render when mounting', () => {
      spy(MapContainer.prototype, 'render');
      const wrapper = mount(
        <MuiThemeProvider>
          <MapContainer />
        </MuiThemeProvider>
      );
      expect(MapContainer.prototype.render.calledOnce).to.equal(true);
    });
    it('contains a div for a map', () => {
      const wrapper = mount(
        <MuiThemeProvider>
          <MapContainer />
        </MuiThemeProvider>
      );
      expect(wrapper.containsMatchingElement(<div></div>)).to.equal(true);
    });
    it('map renders correctly and adds to our html', () => {
      const wrapper = mount(
        <div>
          <Map google={null}/>
        </div>
      );
      expect(wrapper.find('Map').length).to.equal(1);
    });
  });
});
