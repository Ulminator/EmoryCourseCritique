import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class ResendEmailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ""
    }
  }

  updateEmail(event){
    this.setState({email: event.target.value});
  }

  resend() {
        // Send a POST request
        console.log(this.state.email)
        axios({
          method: 'post',
          url: '/account/forgot',
          data: {
            email: this.state.email
          }
        })
        .then(function (response) {
          console.log(response);
          this.props.history.push('/success')
          // window.location.replace("/success");
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
          <div className = "register-body-title">Reset your password</div>
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

                <div className="submit-button-row">
                  <button
                  className="submit-button"
                  type="button"
                  onClick={() => this.resend()}>
                  Resend Email
                  </button>
                </div>

              </div>
              </div>
            </div>



</div>
    )
  }
};


const mapStateToProps = (state) => {
  return{
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResendEmailContainer);
