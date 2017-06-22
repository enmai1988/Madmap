import React from 'react';

class Navbar extends React.Component{

  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className="navbar">
      <button className="newMap">NewMap</button>
      <button className="login">Login</button>
    </div>)
  }
}


export default Navbar;