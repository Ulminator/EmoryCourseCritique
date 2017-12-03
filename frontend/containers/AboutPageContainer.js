import React, {Component} from 'react';
import { connect } from 'react-redux';
import Footer from "./components/Footer"

class AboutPageContainer extends Component {
  constructor(props) {
    super(props)
    console.log(props);
  }
  render() {
    return(

      <div style={{}}>
        Hello
        <Footer />
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
)(AboutPageContainer);