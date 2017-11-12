import React, {Component} from 'react'
import { connect } from 'react-redux';
import SearchBody from  "./components/SearchBody";
import SearchNavBar from"./components/SearchNavBar";


class SearchPageContainer extends Component {
  render() {

    return(

      <div >
        <SearchNavBar/>
        <SearchBody />

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
)(SearchPageContainer);
