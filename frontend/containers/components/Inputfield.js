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
    //this.updateInputValue = this.updateInputValue.bind(this);
    //this._handleKeyPress = this._handleKeyPress.bind(this);
    this.search = this.search.bind(this);
  }

  updateInputValue(event) {
    this.setState({inputValue: event.target.value});
  }
  
  search() {
        // Send a GET request
        console.log(this.state.inputValue);
        
        var querystring = require('querystring');
        var url = '/search?'+querystring.stringify({
            q: this.state.inputValue
        });
        var self=this;
        axios.get('/test?'+querystring.stringify({
            q: this.state.inputValue
        }))
        .then(function (response) {
          
            self.setState({
              courses:response.data
              
            })
          
           window.location.replace(url);
           
           console.log(response.data);

          //window.location.replace(location.search)
          //windows.location = 
          //this.props.history.push('/search');
          
        })
        .catch(function (error) {
          console.log(error);
        });
        this.forceUpdate();
        console.log(this.state.courses);
        //console.log(this);
        this.props.onUpdate([this.state.courses]);
  } 

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(this);
      e.preventDefault();
      //console.log(this);
      this.search();
      
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
          onChange={this.updateInputValue.bind(this)}
          onKeyPress={this._handleKeyPress.bind(this)}
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
