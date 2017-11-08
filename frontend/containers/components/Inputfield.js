import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';


class Inputfield extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
      courses: []
      
    }
    this.updateInputValue = this.updateInputValue.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    
  }

  updateInputValue(event) {
    this.setState({inputValue: event.target.value});
  }
  
  

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(this);
      e.preventDefault();
      //console.log(this);
      var querystring = require('querystring');
        var url = '/search?'+querystring.stringify({
            q: this.state.inputValue
        });
      window.location.href= url;
      
      
    }
  }

  

  render() {
    return (
      <div className="input-field">
        <input
          id="search"
          type="search"
          className="autocomplete"
          placeholder="Search for a class"
          required
          autoFocus="autoFocus"
          autoComplete ="off"
          value={this.state.inputValue.bind} 
          onChange={this.updateInputValue}
          onKeyPress={this._handleKeyPress}
        />
        <label
          className="label-icon inputOverride"
          htmlFor="search" 
        >
          <i
            className="material-icons inputIconOverride"
          >
            search
          </i>
        </label>
        <i className="material-icons">close</i> 
      </div>
    );
  }
}
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
)(Inputfield);
