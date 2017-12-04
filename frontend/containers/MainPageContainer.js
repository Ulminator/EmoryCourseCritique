import React, {Component} from 'react';
import { connect } from 'react-redux';
import Body from  "./components/Body";
import Footer from "./components/Footer"

class MainPageContainer extends Component {
  constructor(props) {
    super(props)
    console.log(props);

  }
  render() {
    return(

      <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <Body />
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
)(MainPageContainer);
