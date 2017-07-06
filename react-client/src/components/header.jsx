import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import LoggedIn from './loggedin.jsx';
import Login from './login.jsx';

const Header = (props) => (
  <div>
    <AppBar
      title="Mad Maps"
      iconElementRight={props.currentUser ? <LoggedIn /> : <Login git={props.git}/>}
    />
  </div>
);

export default Header;