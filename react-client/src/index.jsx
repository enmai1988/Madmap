import React, { Component }from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainMap from './components/map.jsx';
import PinCreator from './components/pincreator.jsx';
import PinInfo from './components/pininfo.jsx';
import Header from './components/header.jsx'; 
// import axios from 'axios';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
            <div>
              <PinCreator/>
              <MainMap/>
            </div>
          <PinInfo/>
        </div>
      </MuiThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'));