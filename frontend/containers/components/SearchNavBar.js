import React from "react";
import { Link } from 'react-router-dom';
import Inputfield from "./Inputfield";

class SearchNavBar extends React.Component {
  render() {
    var b=true;
    return (
      <nav className= "navOverride2 z-depth-1">
        <div className="nav-wrapper">
          <div className="row">
            <div className="col s4" >
              <div className="row">
                <div className="col s2">
                  <Link to='/'><img src="imgs/emory-shield-white.png" style={{height:40,paddingTop:10}}/></Link>
                </div>
                <div className="col s10">
                  <h5>
                    <span
                    >
                      <Link to='/' style={{
                        color: "white"
                      }}>EmoryCourseCritique</Link>
                    </span>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col s5" >
              <form>
                <Inputfield search={b}/>
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