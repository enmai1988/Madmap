import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import LoggedIn from './loggedin.jsx';
import Login from './login.jsx';
import Toc from './toc.jsx'; 

const Header = (props) => (
  <div>
    <AppBar
      title="Mad Maps"
      iconElementLeft={<Toc save={props.save} />}
      iconElementRight={props.currentUser ? <LoggedIn /> : <Login git={props.git}/>}
    />
  </div>
);

export default Header;