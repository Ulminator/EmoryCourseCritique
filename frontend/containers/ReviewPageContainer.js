import React, {Component} from 'react'
import { connect } from 'react-redux';
import ReviewBody from  "./components/ReviewBody";


class ReviewPageContainer extends Component {
  render() {

    return(

      <rbody >

        <ReviewBody />

      </rbody>
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
)(ReviewPageContainer);
