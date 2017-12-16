import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ratings: []
      
    }
    this.onClick = this.onClick.bind(this);
    
  }

  onClick() {
    console.log(this.props.professor);
    var pname = this.props.professor;
    pname=pname.replace(", ","_");
    console.log(pname);
    var querystring = require('querystring');
        
        var url2 = '/rating?'+querystring.stringify({
            course: this.props.cnum,
            prof: pname
        });
            window.location.href = url2;  
           //this.props.history.push(url2);     
  }

  

  render() {
    var rating = 0;
    var ratingColor = "grey-text";
    if(this.props.rating === null || this.props.rating == "NaN" || this.props.rating==0){
        rating = "N/A";
    }else if(this.props.rating > 4){ //its pretty good rating
      rating = this.props.rating;
      ratingColor = "green-text";

    }else if(this.props.rating > 3){ //meh rating
      rating = this.props.rating;
      ratingColor = "light-green-text";
    }else if(this.props.rating > 2){ //garbo rating
      rating = this.props.rating;
      ratingColor = "orange-text";
    }
    else{ //disgusting
      rating = this.props.rating;
      ratingColor = "red-text text-lighten-1";
    }
    return (
      <div className="card-panel white black-text row" onClick={this.onClick} onMouseOver="" style={{cursor: 'pointer'}}>
        <div className="row">
          <div className="col s6">
            <h6>
              {this.props.title1}<span
                style={{
                  color: "#d18e01",
                }}
              >
                {'\u00A0'}{}
              </span>
            </h6>
            <span
              style={{
                fontWeight: 300,
                fontSize: '0.9rem'
              }}
            >
              {this.props.title2}
            </span>{" "}
          </div>
          <div className ="col s5">
          <h5 className={ratingColor}
            style={{
              fontWeight: 300,
              float: "right",
              fontSize: '2.5rem'

            }}
          >
            {rating}
          </h5>
        </div>
      </div>
    </div>

    );
  }
}

export default withRouter(Card);
