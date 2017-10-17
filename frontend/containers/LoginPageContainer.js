import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class LoginPageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  updateEmail(event){
    this.setState({email: event.target.value});
  }

  updatePassword(event){
    this.setState({password: event.target.value});
  }
  login() {
        // Send a POST request
        console.log(this.state.email)
        console.log(this.state.password)
        axios({
          method: 'post',
          url: 'http://localhost:3000/account/login',
          data: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(function (response) {
          console.log(response);
            window.location.replace("http://localhost:3000/");
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  render() {
    return(
      <div>

      <div className = "header">
          <div className = "header-title"> <span className = "header-title-emory">Emory</span> Course Critique </div>
      </div>

      <div className = "register-body">
        <div className = "login-body-main-component">
          <div className = "register-body-title">Login</div>
              <div>

                <div className="inputs-sizes">
                  <input
                   type="text"
                   value={this.state.email}
                   placeholder="Email Address"
                   className="user-input"
                   onChange={(event) => this.updateEmail(event)}
                  />
                </div>

                <div className="inputs-sizes-password">
                  <input
                   type="password"
                   value={this.state.password}
                   placeholder="Password"
                   className="user-input"
                   onChange={(event) => this.updatePassword(event)}
                  />
                  <button
                  type="button"
                  className="forgot-password-button">
                  Forgot your password?
                  </button>
                </div>

                <div className="submit-button-row">
                  <button
                  className="submit-button"
                  type="button" onClick={() => this.login()}>
                  Login!
                  </button>
                </div>

              </div>
              </div>
            </div>

        </div>
    )
  }
};

const mapStateToProps = state => {
  return{
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
