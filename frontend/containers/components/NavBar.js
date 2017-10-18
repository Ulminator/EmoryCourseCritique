import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav className= "navOverride z-depth-0">
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">Login</a></li>
            <li><a href="badges.html">Sign Up</a></li>
            <li><a href="collapsible.html"></a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
