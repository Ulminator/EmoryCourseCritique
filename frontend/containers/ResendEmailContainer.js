import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        var self=this;
        axios({
          method: 'post',
          url: '/account/forgot',
          data: {
            email: self.state.email
          }
        })
        .then(function (response) {
          console.log(response);
          Materialize.toast("Email Sent!", 4000);

          //self.props.history.push('/success')
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
          <Link to='/' className = "header-title" style={{color: '#FFD700'}}> <span className = "header-title-emory">Emory</span> Course Critique </Link>
      </div>

      <lbody >


        <div id="login-page" className="row" style={{height:'-webkit-fill-available'}}>
          <div className="col xl4 push-xl4 l6 push-l3 m10 push-m1 s12 z-depth-4 card-panel nohover2" style={{position: 'relative' , top: '20%', padding: '0 48px'}}> 
            <form className="login-form">
              <div className="row">
                <div className="input-field col s12 center">

                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <div className="inputs-sizes">
                    <input
                     type="text"
                     value={this.state.email}
                     placeholder="Email Address"
                     className="user-input"
                     onChange={(event) => this.updateEmail(event)}
                    />
                  </div>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
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

            </form>
          </div>
        </div>



      </lbody>

      



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
