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
      total_workload:Number,
      filterBy:0

    }
    this.onClick = this.onClick.bind(this);
    this.sortDate = this.sortDate.bind(this);
    this.sortHelpful = this.sortHelpful.bind(this);
    this.sortOverall = this.sortOverall.bind(this);
    this.sortDifficulty = this.sortDifficulty.bind(this);
    this.sortWorkload = this.sortWorkload.bind(this);
    this.filter5 = this.filter5.bind(this);
    this.filter4 = this.filter4.bind(this);
    this.filter3 = this.filter3.bind(this);
    this.filter2 = this.filter2.bind(this);
    this.filter1 = this.filter1.bind(this);
    this.filterNone = this.filterNone.bind(this);
    this.onUpdate= this.onUpdate.bind(this);
    this.coursePage=this.coursePage.bind(this);
    this.profPage=this.profPage.bind(this);

  }

  profPage() {
    var pname = this.state.reviewProfessor;
        pname=pname.replace(", ","_");
    var querystring = require('querystring');
        
        var courseurl = '/prof?'+querystring.stringify({
            prof: pname,
        });
        window.location.href=courseurl;
  }

  coursePage() {
    var querystring = require('querystring');
        
        var courseurl = '/course?'+querystring.stringify({
            course: this.state.reviewCourse,
        });
        window.location.href=courseurl;
  }

  onUpdate(index,upvotes,downvotes) {
    var ratings= this.state.ratings;
    ratings[index].upvotes=upvotes;
    ratings[index].downvotes=downvotes;
    this.setState({ratings:ratings});
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

  sortDate() {
    console.log(this.state.ratings);
    var ratings= this.state.ratings;
    console.log(ratings[0].rated_date);
    console.log(new Date(ratings[0].rated_date).getTime());

    ratings.sort(function(a, b) {
      return new Date(a.rated_date).getTime() - new Date(b.rated_date).getTime();
    });
    document.getElementById("sortDropdown").innerHTML = "&nbsp&nbsp&nbsp&nbspDate&nbsp&nbsp&nbsp&nbsp";
               

    this.setState({ratings:ratings});
  }

  sortHelpful() {
    var ratings= this.state.ratings;
    console.log(ratings[0].upvotes);
    console.log((ratings[1].upvotes+1)/(ratings[1].downvotes+1));
    ratings.sort(function(a, b) {
      return ((a.upvotes+1)/(a.downvotes+1)) - ((b.upvotes+1)/(b.downvotes+1));
    });
    console.log(ratings);
    document.getElementById("sortDropdown").innerHTML = "Helpfulness";

    this.setState({ratings:ratings});
  }

  sortOverall() {
    var ratings= this.state.ratings;
    
    ratings.sort(function(a, b) {
      return a.overall - b.overall;
    });
    document.getElementById("sortDropdown").innerHTML = "&nbspRating&nbsp";

    this.setState({ratings:ratings});

  }

  sortDifficulty() {
    var ratings= this.state.ratings;
    
    ratings.sort(function(a, b) {
      return a.difficulty - b.difficulty;
    });
    document.getElementById("sortDropdown").innerHTML = "Difficulty";

    this.setState({ratings:ratings});
  }

  sortWorkload() {
    var ratings= this.state.ratings;
    
    ratings.sort(function(a, b) {
      return a.workload - b.workload;
    });
    document.getElementById("sortDropdown").innerHTML = "WorkLoad";

    this.setState({ratings:ratings});
  }

  filter5() {
    this.setState({filterBy:5});
    document.getElementById("filterStar").innerHTML = "Show only 5 Stars";

  }

  filter4() {
    this.setState({filterBy:4});
    document.getElementById("filterStar").innerHTML = "Show only 4 Stars";

  }

  filter3() {
    this.setState({filterBy:3});
    document.getElementById("filterStar").innerHTML = "Show only 3 Stars";

  }

  filter2() {
    this.setState({filterBy:2});
    document.getElementById("filterStar").innerHTML = "Show only 2 Stars";

  }

  filter1() {
    this.setState({filterBy:1});
    document.getElementById("filterStar").innerHTML = "Show only 1 Stars";

  }

  filterNone() {
    this.setState({filterBy:0});
    document.getElementById("filterStar").innerHTML = "Show All Stars";

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
      var url= '/testtwo'+location.search;
      console.log(url);
    axios.get(url)
        .then(function (response) {
          console.log(response);
          console.log(response.data);
          if(response.data===null)
          {
            var querystring = require('query-string');
            var parsed = querystring.parse(location.search);
            console.log(parsed);
            console.log(parsed.course);
            console.log(parsed.prof);
            var pname = parsed.prof.replace("_",", ");
            //self.state.reviewCourse= parsed.course;
            //self.state.reviewProfessor= pname;
            self.setState({
              reviewCourse: parsed.course,
              reviewProfessor: pname,
              count: 0,

            }) 
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

    console.log(this.state.ratings);
    
      for (var i = this.state.ratings.length-1; i > -1; i--) {
        overalldist[this.state.ratings[i].overall-1]+=1;
        difficultydist[this.state.ratings[i].difficulty-1]+=1;
        workloaddist[this.state.ratings[i].workload-1]+=1;
        if(this.state.filterBy===0)
          cards.push(<ReviewCard overall={this.state.ratings[i].overall} difficulty={this.state.ratings[i].difficulty} workload={this.state.ratings[i].workload} comment={this.state.ratings[i].comment} rdate={this.state.ratings[i].rated_date} dvotes={this.state.ratings[i].downvotes} uvotes={this.state.ratings[i].upvotes} id={this.state.ratings[i]._id} onUpdate={this.onUpdate} index={i} key={i}/>);
        else
        {
          if(this.state.ratings[i].overall===this.state.filterBy)
            cards.push(<ReviewCard overall={this.state.ratings[i].overall} difficulty={this.state.ratings[i].difficulty} workload={this.state.ratings[i].workload} comment={this.state.ratings[i].comment} rdate={this.state.ratings[i].rated_date} dvotes={this.state.ratings[i].downvotes} uvotes={this.state.ratings[i].upvotes} id={this.state.ratings[i]._id} onUpdate={this.onUpdate} index={i} key={i}/>);
        } 
      }
      console.log(overalldist);
      console.log(difficultydist);
      console.log(workloaddist);

      

      //rating review
      var rating = (this.state.total_overall/this.state.count).toFixed(2);
      var ratingColor = "grey-text";
      if(rating === null || rating == "NaN"){
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
      if(ratingWorkload === null || ratingWorkload == "NaN"){
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
      console.log(this.state.count);
      var counter = this.state.count;
       //rating difficulty review
      var ratingDifficulty = (this.state.total_difficulty/this.state.count).toFixed(2);
      var ratingDifficultyColor = "grey-text";
      if(ratingDifficulty === null || ratingDifficulty == "NaN"){
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

                <h5 onClick={this.coursePage} style={{fontSize:"1.3rem", fontWeight: "300", display:"inline", cursor: "pointer"}}>{this.state.reviewCourse} </h5>
                <h5 onClick={this.profPage} style={{fontSize:"1.3rem", fontWeight: "300", display:"inline", cursor: "pointer"}}>- {this.state.reviewProfessor}</h5>
   

               <h5>Overall Quality:</h5>
                <h4 className={ratingColor} style={{
                      fontSize: "4.5rem",
                    }}
                  >
                    
                  {rating}
                
                </h4>
                <div style={{width:"200px"}}>
                 <table>
                   <tbody>
                     <tr>
                       <td className="histogram-row">
                        <a>5 Star</a>
                       </td>
                       <td className="histogram-row" style={{width:"80%"}}>
                        <div className="a-meter 5star">
                          <div className="a-meter-bar" style={{width:(100*overalldist[4]/this.state.count).toFixed(2)+"%"}}></div>
                        </div>
                       </td>
                       <td className="histogram-row">
                        <a>{(100*overalldist[4]/this.state.count).toFixed(0)+"%"}</a>
                       </td>
                     </tr>
                     <tr>
                       <td className="histogram-row">
                        <a>4 Star</a>
                       </td>
                       <td className="histogram-row">
                        <div className="a-meter 4star">
                          <div className="a-meter-bar" style={{width:(100*overalldist[3]/this.state.count).toFixed(2)+"%"}}></div>
                        </div>
                       </td>
                       <td className="histogram-row">
                        <a>{(100*overalldist[3]/this.state.count).toFixed(0)+"%"}</a>
                       </td>
                     </tr>
                     <tr>
                       <td className="histogram-row">
                        <a>3 Star</a>
                       </td>
                       <td className="histogram-row">
                        <div className="a-meter 3star">
                          <div className="a-meter-bar" style={{width:(100*overalldist[2]/this.state.count).toFixed(2)+"%"}}></div>
                        </div>
                       </td>
                       <td className="histogram-row">
                        <a>{(100*overalldist[2]/this.state.count).toFixed(0)+"%"}</a>
                       </td>
                     </tr>
                     <tr>
                       <td className="histogram-row">
                        <a>2 Star</a>
                       </td>
                       <td className="histogram-row">
                        <div className="a-meter 2star">
                          <div className="a-meter-bar" style={{width:(100*overalldist[1]/this.state.count).toFixed(2)+"%"}}></div>
                        </div>
                       </td>
                       <td className="histogram-row">
                        <a>{(100*overalldist[1]/this.state.count).toFixed(0)+"%"}</a>
                       </td>
                     </tr>
                     <tr>
                       <td className="histogram-row">
                        <a>1 Star</a>
                       </td>
                       <td className="histogram-row">
                        <div className="a-meter 1star">
                          <div className="a-meter-bar" style={{width:(100*overalldist[0]/this.state.count).toFixed(2)+"%"}}></div>
                        </div>
                       </td>
                       <td className="histogram-row">
                        <a>{(100*overalldist[0]/this.state.count).toFixed(0)+"%"}</a>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
                <p className="" style={{margin: "0", position: "relative", top:"8px"}}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '2.4rem',
                    color: '#283469'
                  }}
                >
               {counter}
                </span>{'\u00A0'}<span style={{color: "#424242",fontSize: '1.3rem',}}>  total reviews</span>{" "}
                </p>
                
                <br />
                <span
                  style={{
                    fontWeight: 300
                  }}
                >

                </span>

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
                 <div className= "">

                    <div style={{height: "24px"}}></div>
                    <h5 style={{fontSize:"1.3rem"}}>Sorted By:</h5>
                    <div style={{height: "10px"}}></div>

                    <a id="sortDropdown" className='dropdown-button btn' href='#' data-activates='dropdown1' data-beloworigin="true">{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Date{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</a>
               
                    <ul id='dropdown1' className='dropdownOverride dropdown-content' style={{zIndex:50}}>
                      <li><a href="#!" onClick={this.sortDate}>Date</a></li>
                      <li><a href="#!" onClick={this.sortHelpful}>Helpfulness</a></li>
                      <li className="divider"></li>
                      <li><a href="#!" onClick={this.sortOverall}>Rating</a></li>
                      <li><a href="#!" onClick={this.sortDifficulty}>Difficulty</a></li>
                      <li><a href="#!" onClick={this.sortWorkload}>Workload</a></li>
                    </ul>


                                        <div style={{height: "10px"}}></div>

                  </div>


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
                    <h5 style={{fontSize:"1.3rem"}}>Filter By:</h5>
                    <div style={{height: "10px"}}></div>
                    
                    <a id="filterStar" className='dropdown-button btn' href='#' data-activates='dropdown2' data-beloworigin="true">Show All Stars</a>
               
                    <ul id='dropdown2' className='dropdownOverride dropdown-content' style={{zIndex:50}}>
                      <li><a href="#!" onClick={this.filter5}>5 Star</a></li>
                      <li><a href="#!" onClick={this.filter4}>4 Star</a></li>
                      <li><a href="#!" onClick={this.filter3}>3 Star</a></li>
                      <li><a href="#!" onClick={this.filter2}>2 Star</a></li>
                      <li><a href="#!" onClick={this.filter1}>1 Star</a></li>
                      <li><a href="#!" onClick={this.filterNone}>All</a></li>
                    </ul>
                                        <div style={{height: "10px"}}></div>

                  </div>
                  <div className= "">
                    <h5 style={{fontSize:"1.3rem"}}>Took this class?</h5>
                    <div style={{height: "10px"}}></div>

                    <a style={{backgroundColor: "#d2b000"}} onClick={this.onClick} onMouseOver="" className="waves-effect waves-light btn-large">Add Review Here</a>


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
