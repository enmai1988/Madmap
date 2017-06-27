import React, { Component } from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainMap from './components/map.jsx';
import PinCreator from './components/pincreator.jsx';
import PinInfo from './components/pininfo.jsx';
import Header from './components/header.jsx'; 
import MapContainer from './components/mapContainer.jsx';
import Paper from 'material-ui/Paper';
import UserPage from './components/userpage.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import axios from 'axios';

injectTapEventPlugin();

const mapView = ({match}) => (
  <MuiThemeProvider>
    <div>
      <Header />
      <div style={{height: '0.5em'}}>
      </div>
      <MapContainer />
    </div>
  </MuiThemeProvider>
);

const userView = ({match}) => (
  <MuiThemeProvider>
    <UserPage />
  </MuiThemeProvider>
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={mapView} />
          <Route path='/user' component={userView} />
        </div>
      </Router>
    );
  }
}


render(<App />, document.getElementById('app'));