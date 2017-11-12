import React, {Component} from 'react'
import { connect } from 'react-redux';
import ReviewBody from  "./components/ReviewBody";
import SearchNavBar from "./components/SearchNavBar";


class ReviewPageContainer extends Component {
  render() {

    return(

      <div >
        <SearchNavBar/>
        <ReviewBody />

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
)(ReviewPageContainer);
