import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import LoggedIn from './loggedin.jsx';
import Login from './login.jsx';
import SvgIcon from 'material-ui/SvgIcon';
import style from './style.js';


const Header = (props) => (
  <div>
    <AppBar
      title="Mad Maps"
      iconStyleLeft={style.header.iconStyleLeft}
      iconElementRight={props.currentUser ? <LoggedIn /> : <Login />}
    />
  </div>
);

export default Header;
