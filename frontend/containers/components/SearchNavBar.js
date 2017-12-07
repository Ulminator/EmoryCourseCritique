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
    if(this.props.state.loginStatus){
      link = <li onClick={() => this.logout()} style={{height:56, lineHeight:"56px", paddingRight: "12px", cursor: "pointer", color: "#d38e02"}}>LOGOUT</li>
    }
    else{
      link = <li><Link to='/login' style={{height:56, lineHeight:"56px", color: "#d38e02"}}>LOGIN</Link></li>
      link2 = <li className="hide-on-med-and-down"><Link to='/signup' style={{height:56, lineHeight:"56px", color: "#d38e02"}}>SIGNUP</Link></li>
    }
    return (
      <nav className= "navOverride2 z-depth-1">
        <div className="nav-wrapper">
          <div className="row hide-on-med-and-down">
            <div className="col s4" >
              <div className="row">
                <div className="col s12" style={{paddingLeft: "0"}}>
                  <Link to='/'><img className="responsive-img" src="imgs/shield.png" style={{height: "40px", paddingTop: "14px"}}/></Link>
                  <h5 style={{textAlign: "left", display: "inline", position: "relative", bottom: "4px", left: "12px"}}>
                    <span
                    >
                      <Link to='/' style={{
                        color: "#d38e02",
                        fontSize: "smaller"
                      }}>EMORYCOURSECRITIQUE</Link>
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
              <ul id="nav-mobile" className="right" style={{height: 56}}>
                {link}
                {link2}
              </ul>
            </div>
          </div>

          <div className="row hide-on-large-only">
            <div className="col s2" style={{paddingLeft: "0"}}>
                  <Link to='/'><img src="imgs/shield.png" style={{height:40,paddingTop:10, paddingLeft:20}}/></Link>
            </div>
            <div className="col s7" >
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
