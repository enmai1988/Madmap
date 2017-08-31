import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import GitHub from '../svg/github.jsx';
import {lightBlack} from 'material-ui/styles/colors';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      password: ''
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.textChangePassword = this.textChangePassword.bind(this);
    this.textChangeUsername = this.textChangeUsername.bind(this);

    this.style = {
      'marginTop': '5px',
      'color': 'white'
    };
  }
  textChangeUsername (e) {
    e.preventDefault();
    this.setState({username: e.target.value});
  }

  textChangePassword (e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  handleLogin() {
    axios.post('/login', {username: this.state.username, password: this.state.password})
      .then((res) => {
        console.log('axios request to /Login comlete');
      })
      .catch(err => {
        console.log('Cannot handle login:', err);
      });
  }
  handleSignUp() {
    axios.post('/SignUp', {username: this.state.username, password: this.state.password})
      .then((res) => {
        console.log('axios request to /SignUp complete');
      })
      .catch(err => {
        console.log('Cannot handle SignUp:', err);
      });
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const facebookIcon = <div id="facebook_signin">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/768px-F_icon.svg.png"></img>
      <span>Sign in with Facebook</span>
    </div>;

    return (
      <div>
        <FlatButton onTouchTap={this.handleTouchTap} label="Login" style={this.style}/>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{'horizontal': 'right', 'vertical': 'bottom'}}
          targetOrigin={{'horizontal': 'right', 'vertical': 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu style={{width: 'auto'}} width='auto'>
            <MenuItem>
              <FlatButton
                href="/auth/facebook"
                color={lightBlack}
                icon={facebookIcon}
                style={{padding: '0 10px'}}
              />
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }
}



export default Login;
