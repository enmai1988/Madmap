import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'; 


class Login extends Component {
  static muiName = 'FlatButton';
  
  state = {
    open: false,
    username: '',
    password: ''
  };

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <FlatButton {...this.props} onTouchTap={this.handleTouchTap} label="Login" />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{"horizontal":"right","vertical":"bottom"}}
          targetOrigin={{"horizontal":"right","vertical":"top"}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem>
              <TextField hintText="Username" />
            </MenuItem>
            <MenuItem>
              <TextField hintText="Password" type="password" />
            </MenuItem>
            <MenuItem>
              <FlatButton label="Login" primary={true} />
              <FlatButton label="Sign Up" secondary={true} />
            </MenuItem>
          </Menu>
        </Popover>
     </div>
    );
  }
}



export default Login;