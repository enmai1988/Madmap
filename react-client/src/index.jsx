import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/header.jsx';
import MapContainer from './components/mapContainer.jsx';
import UserPage from './components/userpage.jsx';
import PinInfo from './components/pininfo.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

injectTapEventPlugin();

class mapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCenter: {
        lat: 37.774929,
        lng: -122.41941600000001
      },
      zoom: 15,
      currentUser: null,
      markers: [],
      mapId: null
    };
    this.updateCenter = this.updateCenter.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.save = this.save.bind(this);
    this.github = this.github.bind(this);
    this.replaceURL = (id) => props.history.push(`?=${id}`);
  }

  componentDidMount() {
    let mapId = window.location.href.split('=')[1];
    if (mapId) {
      this.fetch(mapId);
    }
    axios.get('/user/signedIn')
      .then((res) => {
        console.log(res.data[0].user_name);
        this.setState({
          currentUser: res.data[0].user_name
        });
      })
      .catch(err => console.log('signedIn error:', err));
  }

  addMarker(position) {
    let markers = this.state.markers;
    markers.push({
      position: position
    });
    this.setState({
      markers: markers
    });
  }


  github() {
    axios.get('/auth/github')
      .then(res => {
        console.log('github response:', res);
      })
      .catch(err => console.log('ERROR:', err));
  }

  update() {
    let state = JSON.stringify(this.state);
    let mapId = window.location.href.split('=')[1];
    axios.put(`/map/${id}`, {state: state})
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.log('put error:', err));
  }

  save() {
    let state = JSON.stringify(this.state);
    console.log("State is:", state);
    axios.post('/map', {state: state})
      .then(res => {
        console.log(res);
        this.setState({
          mapId: res.data.mapId
        });
        this.replaceURL(res.data.mapId);
      })
      .catch(err => console.log(err));
  }

  fetch(id) {
    console.log("About to run a get request for the state");
    axios.get(`/map/${id}`)
      .then(res => {
        // res.data.markers = this.serializeMarkers(res.data.markers);
        console.log('go go ');
        console.log("got the data:", res.data);
        this.setState(res.data);
      })
      .catch(err => console.log('get error:', err));

  }

  updateCenter(center) {
    this.setState({
      currentCenter: center
    });
  }

  updateZoom(zoom) {
    console.log("zoom is:", zoom);
    this.setState( {
      zoom: zoom
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header save={this.save} git={this.github} currentUser={this.state.currentUser}/>
          <div style={{height: '0.5em'}}>
          </div>
          <MapContainer
            currentCenter={this.state.currentCenter}
            updateCenter={this.updateCenter}
            updateZoom={this.updateZoom}
            markers={this.state.markers}
            addMarker={this.addMarker}
            zoom={this.state.zoom}
          />
        <PinInfo />
        </div>
      </MuiThemeProvider>
    );
  }
}

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
          <Route path='/' component={mapView} />
          <Route path='/user' component={userView} />
        </div>
      </Router>
    );
  }
}


render(<App />, document.getElementById('app'));
