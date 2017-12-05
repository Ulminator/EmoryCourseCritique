import React from "react";
import Inputfield from "./Inputfield";
import Card from "./Card";
import ReviewCard from "./ReviewCard";
import Footer from "./Footer";
import axios from 'axios';
import { connect } from 'react-redux';

class SearchBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      
    }

  }

  

  componentWillMount() {
    console.log('mount');
    console.log(location.search);
          var self=this;
      axios.get('/test'+location.search)
        .then(function (response) {
          
            self.setState({
              courses:response.data,

            })
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
      
    

  }
  componentWillUnmount() {
    console.log('unmount');
  }


  render() {
    
    var cards = [];
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search);
    var input = Object.values(parsed)[0];

    console.log(this.props);
    
      console.log(this.state.courses);
      if(this.state.courses[0]){
        var thiscourse=this.state.courses[0].course_num;
      }
      for (var i = 0; i < this.state.courses.length; i++) {
        cards.push(<Card cnum= {this.state.courses[i].course_num} cname={this.state.courses[i].course_name} professor={this.state.courses[i].professor} rating={this.state.courses[i].average_overall} key={i}/>);
      }
    
    return (
      <sbody >

        
        
      <div style={{height: "60px"}}></div>

        <div className="container" style={{width: "95%", maxWidth: 720}}>
          <h5 className="center grey-text text-darken-2"
            style={{
              fontWeight: 300
            }}>

            <br/>
            Showing Results for <span className="black-text" style={{fontWeight: "400"}}>{input}</span>
          </h5>
          
          <div className="row" style={{minHeight: "-webkit-fill-available"}}>
            <div className="col s12">
              <div style={{height: "20px"}}></div>
              {cards}
              
            </div>
          </div>
        </div>
        <Footer />
      </sbody>
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
)(SearchBody);
