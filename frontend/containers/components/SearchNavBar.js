import React from "react";
import { Link } from 'react-router-dom';
import Inputfield from "./Inputfield";
import { connect } from 'react-redux';

import { LogoutAction } from '../../actions.js';

import axios from 'axios';

class SearchNavBar extends React.Component {
  
  constructor(props) {
    super(props)

  }

  logout() {
    this.props.loginState();

    axios({
      method: 'post',
      url: '/account/logout',
    })

  }

  render() {

    var b=true;
    var link;
    var link2;
    if(this.props.state.logins.loginStatus){
      link = <li onClick={() => this.logout()} style={{fontWeight:300,height:56, lineHeight:"60px", paddingRight: "12px", cursor: "pointer", color: "#d38e02"}}>LOGOUT</li>
    }
    else{
      link = <li><Link to='/login' style={{fontWeight:300,height:56, lineHeight:"60px", color: "#d38e02"}}>LOGIN</Link></li>
      link2 = <li className="hide-on-med-and-down"><Link to='/signup' style={{fontWeight:300,height:56, lineHeight:"60px", color: "#d38e02"}}>SIGNUP</Link></li>
    }
    return (
      <nav className= "navOverride2 z-depth-1">
        <div className="nav-wrapper">
          <div className="row">
            <div className="col m4 l3 hide-on-small-only" >
              <div className="row">
                <div className="col s12" style={{paddingLeft: "0"}}>
                  <Link to='/'><img className="responsive-img" src="imgs/shield.png" style={{height: "40px", paddingTop: "14px"}}/></Link>
                  <h5 style={{textAlign: "left", display: "inline", position: "relative", bottom: "4px", left: "12px", marginRight:"-50px"}}>
                    <span
                    >
                      <Link to='/' style={{
                        color: "#d38e02",
                        fontSize: "smaller",
                        fontWeight:300
                      }}>EmoryCourseCritique</Link>
                    </span>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col s2 hide-on-med-and-up" style={{paddingLeft: "0"}}>
                  <Link to='/'><img src="imgs/shield.png" style={{height:40,paddingTop:10, paddingLeft:20}}/></Link>
            </div>
            <div className="col s7 m5 l6" style={{marginLeft:"15px", marginRight:"-15px"}}>
              <form>
                <Inputfield search={b}/>
              </form>
            </div>
            <div className="col s3">
              <ul id="nav-mobile" className="right" style={{height: 56}}>
                {link}
                {link2}
              </ul>
            </div>
          </div>

          
          
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginState: () => dispatch(LogoutAction())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchNavBar);
