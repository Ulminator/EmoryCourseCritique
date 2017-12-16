import React from "react";
import Inputfield from "./Inputfield";
import SearchCard from "./SearchCard";
import ReviewCard from "./ReviewCard";
import Footer from "./Footer";
import axios from 'axios';
import { connect } from 'react-redux';

class SearchBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      profs: []
    }

  }

  

  componentWillMount() {
    console.log('mount');
    console.log(location.search);
          var self=this;
      axios.get('/test'+location.search)
        .then(function (response) {
          
            self.setState({
              courses:response.data.courses,
              profs:response.data.profs
            })
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
      $(document).ready(function(){
        $('.section.table-of-contents').pushpin({
          top: 0,
          offset: 0
        });
      }); 
      $(document).ready(function(){
        $('.scrollspy').scrollSpy();
      });
       

  }

  componentWillUnmount() {
    console.log('unmount');
  }


  render() {
    
    var cards = [];
    var profcards = [];
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search);
    var input = Object.values(parsed)[0];

    console.log(this.props);
    
      console.log(this.state.courses);
      if(this.state.courses[0]){
        var thiscourse=this.state.courses[0].course_num;
      }
      if(this.state.courses)
      {
        for (var i = 0; i < this.state.courses.length; i++) {
          cards.push(<SearchCard cnum= {this.state.courses[i].course_num} cname={this.state.courses[i].course_name} sections={this.state.courses[i].sections} rating={this.state.courses[i].course_avg_overall} key={i}/>);
        }
      }
      if(this.state.profs)
      {
        for (var i = 0; i < this.state.profs.length; i++) {
          profcards.push(<SearchCard cnum= {this.state.profs[i].professor} sections={this.state.profs[i].sections} rating={this.state.profs[i].course_avg_overall} isProf={true} key={i}/>);
        }
      }
    
    return (
      <sbody >

        
        
      <div style={{height: "60px"}}></div>

        <div className="container" style={{width: "95%", maxWidth: 1120}}>
          <h5 className="center grey-text text-darken-2"
            style={{
              fontWeight: 300,
              marginLeft: "10px"
            }}>

            <br/>
            Course Results for <span className="black-text" style={{fontWeight: "400"}}>{input}</span>
          </h5>
          
          <div className="row" style={{minHeight: "-webkit-fill-available"}}>
            <div className="col hide-on-small-only m2">
              <ul className="section table-of-contents" style={{marginTop:"72px"}}>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#professors">Professors</a></li>
              </ul>
            </div>
            <div className="col s12 m8" style={{marginLeft:"10px"}}>
              <div style={{height: "20px"}}></div>
              <div id="courses" className="section scrollspy">
              {cards}
              </div>
              <h5 className="center grey-text text-darken-2"
                style={{
                  fontWeight: 300
                }}>

                <br/>
                Professor Results for <span className="black-text" style={{fontWeight: "400"}}>{input}</span>
              </h5>
              <div id="professors" className="section scrollspy">
              {profcards}
              </div>
            </div>
            <div className="col hide-on-small-only m2">
              
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
