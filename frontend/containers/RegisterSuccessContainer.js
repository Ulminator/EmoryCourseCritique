import React, {Component} from 'react'
import { connect } from 'react-redux';

class RegisterSuccessContainer extends Component {
  render() {
    return(
      <div>

        <div className = "register-body-success">
          <div className = "register-body-main-component-success">
            <div className="register-body-title-success"><h2>Success!</h2></div>
                <div className="inputs-sizes-success">
                  <h3>Please verify your account through your email</h3>
                </div>
                <div className="submit-button-row">
                  <button
                  type="button"
                  className = "submit-button">
                  resend verification link
                </button>
            </div>
          </div>
        </div>

      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return{
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterSuccessContainer);
