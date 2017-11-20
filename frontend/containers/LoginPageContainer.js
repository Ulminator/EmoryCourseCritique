import React, {PropTypes} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'

import { LoginAction } from '../actions.js'


class LoginPageContainer extends React.Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  updateLogin() {
    this.props.loginState();
  }

  updateEmail(event){
    this.setState({email: event.target.value});
  }

  updatePassword(event){
    this.setState({password: event.target.value});
  }
  redirectResend(){
    this.props.history.push('/resend')
    // window.location.replace("http://localhost:3000/resend");                  /*Fixed the resend url*/
  }
  login() {
        // Send a POST request
        console.log(this.state.email)
        console.log(this.state.password)
        //this refers to the window object when referenced inside a fucntion
        var self = this;

        axios({
          method: 'post',
          url: 'http://localhost:3000/account/login',
          data: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(function (response) {
          console.log(response.status);
          if(response.data.message){
            alert(response.data.message)
          }
          if(response.data.redirectUrl){
            self.props.history.push(response.data.redirectUrl)
            // window.location.replace('http://localhost:3000'+response.data.redirectUrl)
          }else{
            // console.log("LOGIN SUCCESS")
            // console.log(self.props);
            self.updateLogin();
            // console.log(self.props)
            self.props.history.push('/')
            // window.location.replace("http://localhost:3000/");
          }
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
  }
  render() {
    return(
      <div >
      <div className = "header">
          <Link to='/' className = "header-title" style={{color: '#FFD700'}}> <span className = "header-title-emory">Emory</span> Course Critique </Link>
      </div>

      <lbody >


        <div id="login-page" className="login-form2">
          <div className="col s12 z-depth-4 card-panel">
            <form className="login-form">
              <div className="row">
                <div className="input-field col s12 center">


                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">person</i>
                  <input id="username" type="text" value={this.state.email}
                          onChange={(event) => this.updateEmail(event)}/>
                  <label htmlFor="username" className="center-align">Email</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="password" type="password" value={this.state.password}
                         onChange={(event) => this.updatePassword(event)}/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m12 l12  login-text">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <a onClick={() => this.login()} className="btn waves-effect waves-light col s12">Login</a>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 m6 l6">
                  <p className="margin medium-small"><Link to='/signup'>Register</Link></p>
                </div>
                <div className="input-field col s6 m6 l6">
                    <p className="margin right-align medium-small"><a onClick={() => this.redirectResend()}>Forgot password ?</a></p>
                </div>
              </div>

            </form>
          </div>
        </div>



      </lbody>
      </div>


    )
  }
};

const mapStateToProps = state => {
  return{
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginState: () => dispatch(LoginAction())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageContainer);
