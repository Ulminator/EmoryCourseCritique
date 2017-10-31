import React, {Component} from 'react'
import { connect } from 'react-redux';
import SearchBody from  "./components/SearchBody";


class SearchPageContainer extends Component {
  render() {

    return(

      <rbody >

        <SearchBody />

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
)(SearchPageContainer);
