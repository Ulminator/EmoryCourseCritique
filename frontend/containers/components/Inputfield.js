import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
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
        //this.props.history.push(url);
      window.location.href= url;
      console.log(url);
      
      
    }
  }

  

  render() {
    console.log(this.props.search);
    if(this.props.search)
    {
      var icon="material-icons inputIconOverride2";
      var textcolor="white";
    }
    else
    {
      var icon="material-icons inputIconOverride";
      var textcolor="#444";
    }
    return (
      <div className="input-field" style={{height: 54, lineHeight:"54px"}}>
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
          style={{color:textcolor}}
        />
        <label
          className="label-icon inputOverride"
          htmlFor="search" 
        >
          <i
            className={icon} style={{height: 54, lineHeight: "54px"}}
          >
            search
          </i>
        </label>
        <i className="material-icons" style={{height: 54, lineHeight: "54px"}}>close</i> 
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputfield));
