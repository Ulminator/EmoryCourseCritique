import React from "react";
import Inputfield from "./Inputfield";
import Card from "./Card";
import ReviewCard from "./ReviewCard";
import Footer from "./Footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ReviewBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      reviewCourse: '',
      reviewProfessor: '',
      ratings: [],
      count: Number,
      total_difficulty:Number,
      total_overall:Number,
      total_workload:Number

    }
    this.onClick = this.onClick.bind(this);


  }

  onClick() {
    

    var querystring = require('querystring');
    var pname = this.state.reviewProfessor;
    pname=pname.replace(", ","_");
        
        var rateurl = '/rate?'+querystring.stringify({
            course: this.state.reviewCourse,
            prof: pname
        });
        window.location.href= rateurl;
  }

  componentWillMount() {
    
    console.log('mount');
    console.log(location.search);
    
      var self=this;
      var url= '/testtwo'+location.search;
      console.log(url);
    axios.get(url)
        .then(function (response) {
          console.log(response);
          console.log(response.data);
          if(response.data==="")
          {
            var querystring = require('query-string');
            var parsed = querystring.parse(location.search);
            console.log(parsed);
            console.log(parsed.course);
            console.log(parsed.prof);
            var pname = parsed.prof.replace("_",", ");
            self.state.reviewCourse= parsed.course;
            self.state.reviewProfessor= pname;
          }
          else
          {
            self.setState({
              ratings:response.data.ratings,
              reviewCourse: response.data.class_id,
              reviewProfessor: response.data.prof_id,
              count: response.data.rating_count,
              total_difficulty: response.data.total_difficulty,
              total_workload: response.data.total_workload,
              total_overall: response.data.total_overall
            }) 
          //history.pushState(null, '', url2);
          }
          
        })
        .catch(function (error) {
          console.log(error);
        });

    

  }
  componentWillUnmount() {
    console.log('unmount');
  }


  render() {
    
    var querystring = require('query-string');
            var parsed = querystring.parse(location.search);

            var pname = parsed.prof.replace("_",", ");
            this.state.reviewCourse= parsed.course;
            this.state.reviewProfessor= pname;
    
    var cards = [];
    var overalldist =[0,0,0,0,0];
    var difficultydist =[0,0,0,0,0];
    var workloaddist =[0,0,0,0,0];

  

    console.log(this.state.total_overall/this.state.count);

    console.log("rating: " + rating);
    
      var thiscourse='reviews';
      for (var i = 0; i < this.state.ratings.length; i++) {
        overalldist[this.state.ratings[i].overall-1]+=1;
        difficultydist[this.state.ratings[i].difficulty-1]+=1;
        workloaddist[this.state.ratings[i].workload-1]+=1;
        cards.push(<ReviewCard overall={this.state.ratings[i].overall} difficulty={this.state.ratings[i].difficulty} workload={this.state.ratings[i].workload} comment={this.state.ratings[i].comment} rdate={this.state.ratings[i].rated_date} dvotes={this.state.ratings[i].downvotes} uvotes={this.state.ratings[i].upvotes} id={this.state.ratings[i]._id} key={i}/>);
      }
      console.log(overalldist);
      console.log(difficultydist);
      console.log(workloaddist);

      //rating review
      var rating = (this.state.total_overall/this.state.count).toFixed(2);
      var ratingColor = "grey-text";
      if(rating === "null" || rating == "NaN"){
          rating = "N/A";
      }else if(rating > 4){ //its pretty good rating
        ratingColor = "green-text";

      }else if(rating > 3){ //meh rating
        ratingColor = "light-green-text";
      }else if(rating > 2){ //garbo rating
        ratingColor = "orange-text";
      }
      else{ //disgusting
        ratingColor = "red-text text-lighten-1";
      }


      //rating workload review
      var ratingWorkload = (this.state.total_workload/this.state.count).toFixed(2);
      var ratingWorkloadColor = "grey-text";
      if(ratingWorkload === "null" || ratingWorkload == "NaN"){
          ratingWorkload = "N/A";
      }else if(ratingWorkload > 4){ //its pretty good ratingWorkload
        ratingWorkloadColor = "green-text";

      }else if(ratingWorkload > 3){ //meh ratingWorkload
        ratingWorkloadColor = "light-green-text";
      }else if(ratingWorkload > 2){ //garbo ratingWorkload
        ratingWorkloadColor = "orange-text";
      }
      else{ //disgusting
        ratingWorkloadColor = "red-text text-lighten-1";
      }

       //rating difficulty review
      var ratingDifficulty = (this.state.total_difficulty/this.state.count).toFixed(2);
      var ratingDifficultyColor = "grey-text";
      if(ratingDifficulty === "null" || ratingDifficulty == "NaN"){
          ratingDifficulty = "N/A";
      }else if(ratingDifficulty > 4){ //its pretty good ratingDifficulty
        ratingDifficultyColor = "green-text";

      }else if(ratingDifficulty > 3){ //meh ratingDifficulty
        ratingDifficultyColor = "light-green-text";
      }else if(ratingDifficulty > 2){ //garbo ratingDifficulty
        ratingDifficultyColor = "orange-text";
      }
      else{ //disgusting
        ratingDifficultyColor = "red-text text-lighten-1";
      }

      console.log("rating workload: "  +  ratingWorkload)
          console.log("rating difficulty: "  +  ratingDifficulty);

    return (

      <rbody >
        
        <div className=""
          style={{
            margin: "0 auto",
            marginLeft: 15,
            paddingTop:56
          }}
        >
          
        </div>
         <h5 className="center grey-text text-darken-2"
            style={{
              fontWeight: 300
            }}>

            <br/>
            Showing Results for <span className="black-text" style={{fontWeight: "400"}}>{this.state.reviewProfessor}</span>
          </h5>
        <div
          style={{
            height: 20
          }}
        />
        <div className="container"
          style={{
          }}
        >
          <div className="row" style={{minHeight: "-webkit-fill-available"}}>
            <div className="col s12">

              <div className="card-panel nohover2 white black-text row" >
               <div className="col s12 m4">
               <h5>Overall Rating:</h5>
                <h4 className={ratingColor} style={{
                      fontSize: "4.5rem",
                    }}
                  >
                    
                  {rating}
                
                </h4>
              
                
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '2.4rem',
                    color: '#283469'
                  }}
                >
               {this.state.count}
                </span>{'\u00A0'}<span style={{color: "#424242",fontSize: '1.3rem',}}>  total reviews</span>{" "}

                
                <br />
                <span
                  style={{
                    fontWeight: 300
                  }}
                >

                </span>

              </div>
              <div className="col s12 m4">
                    <h5 style={{fontSize:"1.3rem"}}>Overall Difficulty:</h5>
                <h4 className={ratingDifficultyColor}>
             <span
                    style={{
                      fontSize: "2.7rem",
                    }} 
                  >
                  {ratingDifficulty}
                  </span>
                </h4>
                 <div className= "">
                    <div style={{height: "10px"}}></div>

                    <a className=' dropdown-button btn' href='#' data-activates='dropdown1' data-beloworigin="true">Sorted By Date</a>
               
                    <ul id='dropdown1' className='dropdownOverride dropdown-content'>
                      <li><a href="#!">Date</a></li>
                      <li><a href="#!">Upvotes</a></li>
                      <li className="divider"></li>
                      <li><a href="#!">Rating</a></li>
                      <li><a href="#!">Difficulty</a></li>
                      <li><a href="#!">Workload</a></li>
                    </ul>


                                        <div style={{height: "10px"}}></div>

                  </div>
              </div>
              <div className="col s12 m4">
                    <h5 style={{fontSize:"1.3rem"}}>Overall Workload:</h5>
                <h4 className={ratingWorkloadColor}>
             <span
                    style={{
                      fontSize: "2.7rem",
                    }}
                  >
                  {ratingWorkload}
                  </span>
                </h4>
                 <div className= "">
                    <div style={{height: "10px"}}></div>

                    <a onClick={this.onClick} onMouseOver="" className="waves-effect waves-light btn">Add Review Here</a>
                                        <div style={{height: "10px"}}></div>

                  </div>

              </div>

               
              </div>
          

                  
              {cards}

            </div>
          </div>
          
        </div>
          <div style={{height: "64px"}}></div>

        <Footer />
      </rbody>
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
)(ReviewBody);
