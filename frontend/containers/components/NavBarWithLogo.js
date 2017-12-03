import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { LogoutAction } from '../../actions.js';

import axios from 'axios';

class NavBarWithLogo extends React.Component {
  constructor(props) {
    super(props)

  }

 logout() {
    this.props.loginState();
    // axios({
    //   method: 'get',
    //   url: '/users/currentUser',
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    axios({
      method: 'post',
      url: '/account/logout',
    })
    // axios({
    //   method: 'get',
    //   url: '/users/currentUser',
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
  }

 render() {
    var link;
    var link2;
    if(this.props.state.loginStatus){
      link = <li onClick={() => this.logout()} style={{cursor: "pointer"}}>Logout</li>
    }
    else{
      link = <li><Link to='/login'>Login</Link></li>
      link2 = <li><Link to='/signup'>Signup</Link></li>
    }

    return (
      <nav className= "navOverride z-depth-0">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo hide-on-small-only" style={{fontSize: "1.7rem"}}><img className="responsive-img" src="imgs/emory-shield-white.png" style={{display: "inline" ,height: "50px", paddingTop: "10px", paddingLeft: "20px"}}/><span className="logoNavBarWithLogo">EmoryCourseCritique</span></a>
            <a href="/" className="left hide-on-med-and-up" style={{fontSize: "1.7rem"}}><img className="responsive-img" src="imgs/emory-shield-white.png" style={{display: "inline" ,height: "50px", paddingTop: "10px", paddingLeft: "20px"}}/><span className="logoNavBarWithLogo hide-on-small-only">EmoryCourseCritique</span></a>

            <ul id="nav-mobile" className="right">
              {link}
              {link2}
              <li><a href="collapsible.html"></a></li>
            </ul>
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
)(NavBarWithLogo);
