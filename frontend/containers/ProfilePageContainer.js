import React, {Component} from 'react'
import { connect } from 'react-redux';
import ProfileBody from  "./components/ProfileBody";
import SearchNavBar from "./components/SearchNavBar";


class ProfilePageContainer extends Component {
  render() {

    return(

      <div >
        <SearchNavBar/>
        <ProfileBody />

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
)(ProfilePageContainer);