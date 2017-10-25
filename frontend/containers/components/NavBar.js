import React from "react";
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <nav className= "navOverride z-depth-0">
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><a href="collapsible.html"></a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
