import React from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { LogoutAction } from '../../actions.js'

import axios from 'axios';

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        link : "",
        link2 : ""
    }
  }

 logout() {
    this.props.loginState();
    // axios({
    //   method: 'get',
    //   url: 'http://localhost:3000/users/currentUser',
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    axios({
      method: 'get',
      url: 'http://localhost:3000/account/logout',
    })
    // axios({
    //   method: 'get',
    //   url: 'http://localhost:3000/users/currentUser',
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
  }

 render() {
    var condition
    if(this.props.state.loginStatus){
      this.state.link = <li onClick={() => this.logout()}>Logout</li>
    }
    else{
      this.state.link = <li><Link to='/login'>Login</Link></li>
      this.state.link2 = <li><Link to='/signup'>Signup</Link></li>
    }
    console.log(condition);
    return (
      <nav className= "navOverride z-depth-0">
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.state.link}
              {this.state.link2}
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
)(NavBar);
