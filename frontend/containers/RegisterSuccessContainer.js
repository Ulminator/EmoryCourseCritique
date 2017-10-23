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
                  <h3>An email has been sent to you!</h3>
                </div>
                <div className="submit-button-row">
                  <button
                  type="button"
                  className = "submit-button">
                  click here to resend email
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
