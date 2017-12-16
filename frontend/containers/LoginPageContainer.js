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
    // window.location.replace("/resend");                  /*Fixed the resend url*/
  }
  login() {
        // Send a POST request
        console.log(this.state.email)
        console.log(this.state.password)
        //this refers to the window object when referenced inside a fucntion
        var self = this;

        axios({
          method: 'post',
          url: '/account/login',
          data: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(function (response) {
          console.log(response.status);
          if(response.data.message){
             Materialize.toast(response.data.message, 4000);

          }
          if(response.data.redirectUrl&&!self.props.history.location.key){
            self.updateLogin();
            self.props.history.push(response.data.redirectUrl)
            // window.location.replace(response.data.redirectUrl)
          }else{
            // console.log("LOGIN SUCCESS")
             //console.log(self.props);
            self.updateLogin();
            self.props.history.goBack();
          }
        })
        .catch(function (error) {
          Materialize.toast(error.response.data.message, 4000);

        });



  }
  render() {


    return(
      <div onKeyDown={this.inputListener}>
      <div className = "header">
          <Link to='/' className = "header-title" style={{color: '#FFD700'}}> <span className = "header-title-emory">Emory</span> Course Critique </Link>
      </div>

      <lbody>


        <div id="login-page" className="row">
          <div className="col xl4 push-xl4 l6 push-l3 m10 push-m1 s12 z-depth-4 card-panel nohover2" style={{position: 'relative' , top: '50px', padding: '0 48px'}}>
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
                <div className="center">
                  <a id="loginBtn" onClick={() => this.login()} className="btn-large waves-effect waves-light">Login</a>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 m6">
                 <p style={{marginBottom: "0px", fontWeight: "300", fontSize: "1.2rem"}}>Don't have an account?</p>
                  <p style={{marginTop: "4px"}} className="margin medium-small"><Link to='/signup'>Register Here</Link></p>
                </div>
                <div className="input-field col s6 m6 push-m1">
                    <p style={{marginBottom: "0px", fontWeight: "300", fontSize: "1.2rem"}}>Forgot password?</p>

                    <p style={{marginTop: "4px"}} className="margin medium-small"><a href="#!" onClick={() => this.redirectResend()}>Reset it here</a></p>
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
