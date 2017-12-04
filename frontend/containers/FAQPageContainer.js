import React, {Component} from 'react';
import { connect } from 'react-redux';
import Footer from "./components/Footer";
import NavBarWithLogo from "./components/NavBarWithLogo";

class FAQPageContainer extends Component {
  constructor(props) {
    super(props)
    console.log(props);
  }
  render() {
    return(
     <div>
        <div style={{backgroundColor: "#002978", height: "64px"}}>
          <NavBarWithLogo/>
        </div>
        <div className="container">
          <div style={{height: "45px"}}></div>
            <h2 className="center" style={{fontWeight: "300"}}>Frequently Asked Questions</h2>
          <div style={{height: "45px"}}></div>
          <div className="row">
            <div className="col s12 m10 offset-m1">
                <ul className="collapsible" data-collapsible="accordion">
                 <li>
                    <div className="collapsible-header active"><i className="material-icons">question_answer</i>What is this?</div>
                    <div className="collapsible-body"><span>Emory Course Critique is a site made by a group of Emory Undergrads who want to make it easier for students to choose courses. Search for a course number or course name to get started!</span></div>
                  </li>    
                  <li>
                    <div className="collapsible-header"><i className="material-icons">whatshot</i>How do I review a course?</div>
                    <div className="collapsible-body"><span>You need to be an Emory Undergraduate student with an active email ending in @emory.edu. After you first register, you need to activate your account through that email. </span></div>
                  </li>

                  <li>
                    <div className="collapsible-header"><i className="material-icons">person_outline</i>Is this anonymous?</div>
                    <div className="collapsible-body"><span>Yea.</span></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">attach_money</i>Is this free?</div>
                    <div className="collapsible-body"><span>You bet it is.</span></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">school</i>Is this sponsored by the University?</div>
                    <div className="collapsible-body"><span>Nope.</span></div>
                  </li>
                </ul>
            </div>
          </div>
          <div style={{height: "90px"}}></div>
          </div>
        <div>

           <Footer/>
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
)(FAQPageContainer);