import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
//import IconMenu from 'material-ui/IconMenu';
//import MenuItem from 'material-ui/MenuItem';
//import FlatButton from 'material-ui/FlatButton';
import TocIcon from 'material-ui/svg-icons/action/toc';
import FileCloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import LoggedIn from './loggedin.jsx';
import Login from './login.jsx';
import Toc from './toc.jsx'; 

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  
  render() {
    return (
      <div>
        <AppBar
          title="Map Maps"
          iconElementLeft={<Toc save={this.props.save} />}
          iconElementRight={this.state.loggedIn ? <LoggedIn /> : <Login git={this.props.git}/>}
        />
      </div>
    );
  }
}

export default Header;