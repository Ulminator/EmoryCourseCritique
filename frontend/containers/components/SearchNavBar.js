import React from "react";
import { Link } from 'react-router-dom'
import Inputfield from "./Inputfield";

class SearchNavBar extends React.Component {
  render() {
    return (
      <nav className= "navOverride2 z-depth-0">
        <div className="nav-wrapper">
          <div className="row">
            <div className="col s3" >
              <h5>
                <span
                >
                  <Link to='/' style={{
                    color: "white"
                  }}>EmoryCourseCritique</Link>
                </span>
              </h5>
            </div>
            <div className="col s6" >
              <form>
                <Inputfield/>
              </form>
            </div>
            <div className="col s3">
              <ul id="nav-mobile" className="right hide-on-med-and-down" style={{height: 56}}>
                <li><Link to='/login' style={{height:56, lineHeight:"56px"}}>Login</Link></li>
                <li><Link to='/signup' style={{height:56, lineHeight:"56px"}}>Signup</Link></li>
              </ul>
            </div>
          </div>
          
        </div>
      </nav>
    );
  }
}

export default SearchNavBar;