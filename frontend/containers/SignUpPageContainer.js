import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class SignUpPageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeated: ""
    }
  }

  updateFirstname(event){
    console.log(this.state.firstname)
    this.setState({firstname: event.target.value});
  }

  updateLastname(event){
    this.setState({lastname: event.target.value});
  }

  updateEmail(event){
    this.setState({email: event.target.value});
  }

  updatePassword(event){
    this.setState({password: event.target.value});
  }

  updateRepeated(event){
    this.setState({repeated: event.target.value});
  }


  signup() {
        // Send a POST request
        console.log(this.state.firstname)
        console.log(this.state.lastname)
        console.log(this.state.repeated)
        console.log(this.state.email)
        console.log(this.state.password)

        if (this.state.password !== this.state.repeated) {
          console.log("password didn't match")
        } else {
        axios({
          method: 'post',
          url: 'http://localhost:3000/account/signup',
          data: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
          }
        })

        .then(function (response) {
          console.log(response);
          window.location.replace("http://localhost:3000/success");
        })
        .catch(function (error) {
          console.log(error.response.data.message);
        });
      }
  }
  render() {
    return(
      <div>

      <div className = "header">
          <div className = "header-title"> <span className = "header-title-emory">Emory</span> Course Critique </div>
      </div>

      <div className = "register-body">
        <div className = "register-body-main-component">
          <div className = "register-body-title">Sign Up</div>

          <div className = "first-last-name">
          <div className = "name-col">
          <input
           type="text"
           value={this.state.firstname}
           placeholder="First name"
           className="user-input"
           onChange={(event) => this.updateFirstname(event)}
          />
          </div>

          <div className = "name-col">
          <input
           type="text"
           value={this.state.lastname}
           placeholder="Last name"
           className="user-input"
           onChange={(event) => this.updateLastname(event)}
          />
          </div>
          </div>


          <div className = "inputs-sizes">
          <input
           type="text"
           value={this.state.email}
           placeholder="Email Address"
           className="user-input"
           onChange={(event) => this.updateEmail(event)}
          />
          </div>

          <div className = "inputs-sizes">
          <input
           type="password"
           value={this.state.password}
           placeholder="Password"
           className="user-input"
           onChange={(event) => this.updatePassword(event)}
          />
          </div>

          <div className = "inputs-sizes">
          <input
           type="password"
           value={this.state.repeated}
           placeholder="Repeat Password"
           className="user-input"
           onChange={(event) => this.updateRepeated(event)}
          />
          </div>

          <div className="submit-button-row">
          <button
          type="button"
          className="submit-button"
          onClick={() => this.signup()}>
          Submit
          </button>
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
)(SignUpPageContainer);
