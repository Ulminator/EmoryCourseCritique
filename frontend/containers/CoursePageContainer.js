import React, {Component} from 'react'
import { connect } from 'react-redux';
import CourseBody from  "./components/CourseBody";
import SearchNavBar from "./components/SearchNavBar";


class CoursePageContainer extends Component {
  render() {

    return(

      <div >
        <SearchNavBar/>
        <CourseBody />

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
)(CoursePageContainer);