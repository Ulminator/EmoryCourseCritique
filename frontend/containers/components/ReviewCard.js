import React from "react";
import axios from 'axios';

class ReviewCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ratings: [],
      //upvotes: 0,
      //downvotes: 0,
      change: false
    }
    this.uClick = this.uClick.bind(this);
    this.dClick = this.dClick.bind(this);
  }

  uClick() {
    
    // Send a POST request
    var self=this;
          axios({
            method: 'post',
            url: '/rating/upvote',
            data: {
              critique_id: self.props.id
            }
          })
          .then(function (response) {
            console.log(response);
               
    
      //self.setState({upvotes: response.data.upvotes, downvotes: response.data.downvotes});
      console.log(self.state.upvotes);
      //self.props.onUpdate(self.props.index,self.state.upvotes,self.state.downvotes);
      self.props.onUpdate(self.props.index,response.data.upvotes,response.data.downvotes);

          })
          .catch(function (error) {
            //console.log(error.response.data.message);
            
            Materialize.toast(error.response.data.message, 4000);
          });
    
    
  }

  dClick() {
    var self=this;
    // Send a POST request
          axios({
            method: 'post',
            url: '/rating/downvote',
            data: {
              critique_id: self.props.id
            }
          })
          .then(function (response) {
            console.log(response);

    
      //self.setState({upvotes: response.data.upvotes, downvotes: response.data.downvotes});
      console.log(self.state.upvotes);
      //self.props.onUpdate(self.props.index,self.state.upvotes,self.state.downvotes);
      self.props.onUpdate(self.props.index,response.data.upvotes,response.data.downvotes);
    
          })
          .catch(function (error) {
            //console.log(error.response.data.message);
            
            Materialize.toast(error.response.data.message, 4000);
          });
    
    
  }
/*
  componentWillMount() {
    this.setState({upvotes:this.props.uvotes});
    this.setState({downvotes:this.props.dvotes});
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps);
    console.log(this.props.uvotes);
    this.setState({upvotes:newProps.uvotes});
    this.setState({downvotes:newProps.dvotes});
  }*/

  render() {
    var rating = this.props.overall;
    var ratingColor = "grey-text";
    if(!rating){
        rating = "N/A";
    }else if(rating > 4){ //its pretty good rating
      rating = rating;
      ratingColor = "green-text text-darken-1";

    }else if(rating > 3){ //meh rating
      rating = rating;
      ratingColor = "light-green-text";
    }else if(rating > 2){ //garbo rating
      rating = rating;
      ratingColor = "orange-text";
    }
    else{ //disgusting
      rating = rating;
      ratingColor = "red-text text-lighten-1";
    }

    //difficulty rating
    var difficultyRating = this.props.difficulty;
    var difficultyRatingColor = "grey-text";
    if(!difficultyRating){
        difficultyRating = "N/A";
    }else if(difficultyRating > 4){ //its pretty good difficultyRating
      difficultyRating = difficultyRating;
      difficultyRatingColor = "red-text text-lighten-1";

    }else if(difficultyRating > 3){ //meh difficultyRating
      difficultyRating = difficultyRating;
      difficultyRatingColor = "orange-text";
    }else if(difficultyRating > 2){ //garbo difficultyRating
      difficultyRating = difficultyRating;
      difficultyRatingColor = "light-green-text";
    }
    else{ //disgusting
      difficultyRating = difficultyRating;
      ratingColor = "green-text text-darken-1";
    }


    //workload rating
    var workloadRating = this.props.workload;
    var workloadRatingColor = "grey-text";
    if(!workloadRating){
        workloadRating = "N/A";
    }else if(workloadRating > 4){ //its pretty good workloadRating
      workloadRating = workloadRating;
      workloadRatingColor = "red-text text-lighten-1";

    }else if(workloadRating > 3){ //meh workloadRating
      workloadRating = workloadRating;
      workloadRatingColor = "orange-text";
    }else if(workloadRating > 2){ //garbo workloadRating
      workloadRating = workloadRating;
      workloadRatingColor = "light-green-text";
    }
    else{ //disgusting
      workloadRating = workloadRating;
      ratingColor = "green-text text-darken-1";
    }


    //var date= this.props.rdate.toString();
    console.log(this.props.uvotes);
    if(this.props.rdate)
    {
      var date= new Date(this.props.rdate);
      var dateformat= ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
    }
    

    return (
      <div className="card-panel nohover2 white black-text row" style={{position: "relative"}} >
        <div className="col s6 m3">
        <h5 style={{
            }}>
          Rating:
            {'\u00A0'}<span className={ratingColor}
            style={{
              color: "#d18e01"
            }}
          >
            {rating} 
          </span> 
        </h5>
        
        <span
          style={{
            fontWeight: 400,  
            fontSize: "1.25rem"
          }}
        >
          Difficulty:<span style={{
            fontWeight: 400,  
            fontSize: "1.4rem"
          }} className={difficultyRatingColor}> {difficultyRating}</span>
        </span>{" "}
        <br />
        <span 
          style={{
            fontWeight: 400,
            fontSize: "1.25rem"
          }}
        >
          Workload: <span style={{
            fontWeight: 400,  
            fontSize: "1.3rem"
          }}className={workloadRatingColor}> {workloadRating}</span>
        </span>{" "}
        <br />
        <span
          style={{
            fontWeight: 300,
            fontSize: "1.1rem"
          }}
        >
          {dateformat}

        </span>
       
        </div>
        <div className="col s6 hide-on-med-and-up" style={{position: "absolute", top: "24px", right: "24px"}}>
        <div className="right">
          <p style={{fontSize: "0.8rem", fontWeight: "300"}}>{'\u00A0'}Was this helpful?</p>
          <a className="noSelect" onClick={this.uClick} onMouseOver="" style={{
              color: "#002a78", cursor:'pointer',  position: "relative", left: "12px"
            }}><i className="material-icons prefix green-text text-darken-1">thumb_up</i>{this.props.uvotes}</a>
            <a className="noSelect" onClick={this.dClick} onMouseOver="" style={{
              color: "#002a78", cursor:'pointer', position: "relative", left: "24px"
            }}><i className="material-icons prefix red-text text-lighten-2">thumb_down</i>{this.props.dvotes}</a>
          </div>
        </div>
        <div className="col s12 m7">
         <p style={{fontSize: "1.1rem", fontWeight: "300"}}>Comments:</p>
          <blockquote style={{fontSize: "1.0rem", overflowWrap: "break-word"}}>{this.props.comment}</blockquote>

        </div>
        <div className="col s1"></div>
        <div className="hide-on-small-only" style={{position: "absolute", bottom: "24px", right: "24px"}}>
          <p style={{fontSize: "0.8rem", fontWeight: "300"}}>{'\u00A0'}Was this helpful?</p>
          <a className="noSelect" onClick={this.uClick} onMouseOver="" style={{
              color: "#002a78", cursor:'pointer',  position: "relative", left: "12px"
            }}><i className="material-icons prefix green-text text-darken-1">thumb_up</i>{this.props.uvotes}</a>
            <a className="noSelect" onClick={this.dClick} onMouseOver="" style={{
              color: "#002a78", cursor:'pointer', position: "relative", left: "24px"
            }}><i className="material-icons prefix red-text text-lighten-2">thumb_down</i>{this.props.dvotes}</a>
          </div>

    
      </div>
    );
  }
}

export default ReviewCard;