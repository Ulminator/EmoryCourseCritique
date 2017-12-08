import React from "react";
import Inputfield from "./Inputfield";
import Card from "./Card";
import Footer from "./Footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CourseBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      course_num: '',
      course_name: '',
      sections: [],
      credits: '',
      ger: '',
      description: '',
      avg_difficulty:Number,
      avg_overall:Number,
      avg_workload:Number

    }
    this.onClick = this.onClick.bind(this);
    this.sortDate = this.sortDate.bind(this);
    this.sortOverall = this.sortOverall.bind(this);
    this.sortDifficulty = this.sortDifficulty.bind(this);
    this.sortWorkload = this.sortWorkload.bind(this);

  }


  onClick() {
    


  }

  sortDate() {
    console.log(this.state.sections);
    var ratings= this.state.sections;
    console.log(ratings[0].rated_date);
    console.log(new Date(ratings[0].rated_date).getTime());

    ratings.sort(function(a, b) {
      return new Date(a.rated_date).getTime() - new Date(b.rated_date).getTime();
    });
    document.getElementById("sortDropdown").innerHTML = "&nbsp&nbsp&nbsp&nbspDate&nbsp&nbsp&nbsp&nbsp";
               

    this.setState({ratings:ratings});
  }

  sortOverall() {
    var ratings= this.state.sections;
    
    ratings.sort(function(a, b) {
      return a.overall - b.overall;
    });
    document.getElementById("sortDropdown").innerHTML = "&nbspRating&nbsp";

    this.setState({ratings:ratings});

  }

  sortDifficulty() {
    var ratings= this.state.sections;
    
    ratings.sort(function(a, b) {
      return a.difficulty - b.difficulty;
    });
    document.getElementById("sortDropdown").innerHTML = "Difficulty";

    this.setState({ratings:ratings});
  }

  sortWorkload() {
    var ratings= this.state.sections;
    
    ratings.sort(function(a, b) {
      return a.workload - b.workload;
    });
    document.getElementById("sortDropdown").innerHTML = "WorkLoad";

    this.setState({ratings:ratings});
  }



  componentWillMount() {
    $(document).ready(function(){
      $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrainWidth: true, // Does not change width of dropdown to that of the activator
          hover: false, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: true, // Displays dropdown below the button
          alignment: 'right', // Displays dropdown with edge aligned to the left of button
          stopPropagation: false // Stops event propagation
        }
      );
    });
    console.log('mount');
    console.log(location.search);
    
      var self=this;
      var url= '/section'+location.search;
      console.log(url);
    axios.get(url)
        .then(function (response) {
          
            self.setState({
              course_num: response.data.course_num,
              course_name: response.data.course_name,
              sections: response.data.sections,
              credits: response.data.credits,
              ger: response.data.ger,
              description: response.data.description,
              avg_difficulty:response.data.course_avg_difficulty,
              avg_overall:response.data.course_avg_overall,
              avg_workload:response.data.course_avg_workload
            }) 
          //history.pushState(null, '', url2);
          
          
        })
        .catch(function (error) {
          console.log(error);
        });

    

  }



  render() {
    
    
    var cards = [];

   

    console.log(this.state.sections);
    
      for (var i = this.state.sections.length-1; i > -1; i--) {
        
        cards.push(<Card cnum= {this.state.course_num} cname={this.state.course_name} professor={this.state.sections[i].professor} rating={this.state.sections[i].average_overall} key={i}/>);
        
      }


      

      //rating review
      var rating = this.state.avg_overall;
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
      var ratingWorkload = this.state.avg_workload;
      var ratingWorkloadColor = "grey-text";
      if(ratingWorkload === "null" || ratingWorkload == "NaN"){
          ratingWorkload = "N/A";
      }else if(ratingWorkload > 4){ //its pretty good ratingWorkload
        ratingWorkloadColor = "red-text text-lighten-1";

      }else if(ratingWorkload > 3){ //meh ratingWorkload
        ratingWorkloadColor = "orange-text";
      }else if(ratingWorkload > 2){ //garbo ratingWorkload
        ratingWorkloadColor = "light-green-text";
      }
      else{ //disgusting
        ratingWorkloadColor = "green-text";
      }
      var counter = this.state.sections.length;
       //rating difficulty review
      var ratingDifficulty = this.state.avg_difficulty;
      var ratingDifficultyColor = "grey-text";
      if(ratingDifficulty === "null" || ratingDifficulty == "NaN"){
          ratingDifficulty = "N/A";
      }else if(ratingDifficulty > 4){ //its pretty good ratingDifficulty
        ratingDifficultyColor = "red-text text-lighten-1";

      }else if(ratingDifficulty > 3){ //meh ratingDifficulty
        ratingDifficultyColor = "orange-text";
      }else if(ratingDifficulty > 2){ //garbo ratingDifficulty
        ratingDifficultyColor = "light-green-text";
      }
      else{ //disgusting
        ratingDifficultyColor = "green-text";
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

          </h5>
        
        <div className="container"
          style={{
          }}
        >
          <div className="row" style={{minHeight: "-webkit-fill-available"}}>
            <div className="col s12">

              <div className="card-panel nohover2 white black-text row" >
               <div className="col s12 m4">
               <h5 style={{fontSize:"1.3rem", fontWeight: "300"}}>{this.state.course_num}-{this.state.course_name}</h5>

               <h5>Overall Quality:</h5>
                <h4 className={ratingColor} style={{
                      fontSize: "4.5rem",
                    }}
                  >
                    
                  {rating}
                
                </h4>
                <br />
                <span
                  style={{
                    fontWeight: 300
                  }}
                >
                Description: {this.state.description}
                </span>
                
                <p className="" style={{margin: "0", position: "relative", top:"8px"}}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '2.4rem',
                    color: '#283469'
                  }}
                >
               {counter}
                </span>{'\u00A0'}<span style={{color: "#424242",fontSize: '1.3rem',}}>  total sections</span>{" "}
                </p>
                
                <br />
                

              </div>
              <div className="col s6 m4">
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
                
                <br />
                <span
                  style={{
                    fontWeight: 300
                  }}
                >
                GER: {this.state.ger}
                </span>

                <br />
                <span
                  style={{
                    fontWeight: 300
                  }}
                >
                Credits: {this.state.credits}
                </span> 


              </div>
              <div className="col s6 m4 l4">
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

                    <div style={{height: "24px"}}></div>
                    <h5 style={{fontSize:"1.3rem"}}>Sorted By:</h5>
                    <div style={{height: "10px"}}></div>

                    <a id="sortDropdown" className='dropdown-button btn' href='#' data-activates='dropdown1' data-beloworigin="true">{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Date{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</a>
               
                    <ul id='dropdown1' className='dropdownOverride dropdown-content' style={{zIndex:50}}>
                      <li><a href="#!" onClick={this.sortDate}>Date</a></li>
                      <li className="divider"></li>
                      <li><a href="#!" onClick={this.sortOverall}>Rating</a></li>
                      <li><a href="#!" onClick={this.sortDifficulty}>Difficulty</a></li>
                      <li><a href="#!" onClick={this.sortWorkload}>Workload</a></li>
                    </ul>


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
)(CourseBody);
