import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/header.jsx'; 
import MapContainer from './components/mapContainer.jsx';
import UserPage from './components/userpage.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

injectTapEventPlugin();

class mapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCenter: {
        lat: 44,
        lng: -122
      },
      zoom: 15,
      currentUser: null,
      markers:[]
    };
    this.updateCenter = this.updateCenter.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.save = this.save.bind(this);
    this.github = this.github.bind(this);
    this.serializeMarkers = this.serializeMarkers.bind(this);
    this.replaceURL = (id) => props.history.push(`?=${id}`);
  }

  componentDidMount() {
    let mapId = window.location.href.split('=')[1];
    this.setState({
      zoom: 13
    });
    if (mapId) {
      this.fetch(mapId);
    }
  }

  serializeMarkers(arr) {
    const stringMarkers = (arrOfMarkers) => {
      return arrOfMarkers.map(marker => JSON.stringify(marker));
    };
    const parseMarkers = (arrOfMarkers) => {
      return arrOfMarkers.map(marker => JSON.parse(marker));
    };
    return typeof arr[0] === 'string' ? parseMarkers(arr) : stringMarkers(arr);
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
    console.log('hello');
    axios.get('/auth/github')
      .then(res => {
        console.log('github response:', res);
      })
      .catch(err => console.log('ERROR:', err));
  }

  save() {
    let marks = this.serializeMarkers(this.state.markers);
    let state = this.state;
    state.markers = marks;
    axios.post('/map/save', {state: state})
      .then(res => {
        this.replaceURL(res.data.id);
      })
      .catch(err => console.log(err));
  }

  fetch(id) {
    axios.get(`/map/${id}`)
      .then(res => {
        res.data.markers = this.serializeMarkers(res.data.markers);
        console.log('go go ');
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
          <Header save={this.save} git={this.github} savecurrentUser={this.state.currentUser}/>
          <div style={{height: '0.5em'}}>
          </div>
          <MapContainer 
            currentCenter={this.state.currentCenter}
            updateCenter={this.updateCenter}
            updateZoom={this.updateZoom}
            markers={this.state.markers}
            addMarker={this.addMarker}
            zoom={this.state.zoom}/>
          />
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