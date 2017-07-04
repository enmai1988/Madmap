import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
// import GitHub from '../svg/github.jsx';
import {lightBlack} from 'material-ui/styles/colors';
import axios from 'axios';

class Login extends Component {
  // static muiName = 'FlatButton';
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
    let githubIcon = <svg aria-hidden="true" className="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>;

    return (
      <div>
        <FlatButton {...this.props} onTouchTap={this.handleTouchTap} label="Login" />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{'horizontal': 'right', 'vertical': 'bottom'}}
          targetOrigin={{'horizontal': 'right', 'vertical': 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem>
              <TextField hintText="Username" onBlur={this.textChangeUsername}/>
            </MenuItem>
            <MenuItem>
              <TextField hintText="Password" type="password" onBlur={this.textChangePassword}/>
            </MenuItem>
            <MenuItem>
              <FlatButton label="Login" primary={true} onTouchTap={this.handleLogin}/>
              <FlatButton label="Sign Up" secondary={true} onTouchTap={this.handleSignUp}/>
              <FlatButton
                href="/auth/github"
                target="_blank"
                color={lightBlack}
                icon={githubIcon}
                style={{margin: 12}}
              />
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }
}



export default Login;
