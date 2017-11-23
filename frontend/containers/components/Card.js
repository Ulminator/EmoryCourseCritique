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
    var ratingColor = "grey-text text-darken-2";
    if(this.props.rating === "null"){
        rating = "N/A";
    }else if(this.props.rating > 4){ //its pretty good rating
      rating = this.props.rating;
      ratingColor = "green-text";

    }else if(this.props.rating > 3){ //meh rating
      rating = this.props.rating;
      ratingColor = "lime-text";
    }else if(this.props.rating > 2){ //garbo rating
      rating = this.props.rating;
      ratingColor = "orange-text";
    }
    else{ //disgusting
      rating = this.props.rating;
      ratingColor = "red-text text-lighten-1";
    }
    return (
      <div className="card-panel white black-text" onClick={this.onClick} onMouseOver="" style={{cursor: 'pointer'}}>
        <div className="row">
          <div className="col s6">
            <h5>
              {this.props.professor}<span
                style={{
                  color: "#d18e01"
                }}
              >
                {'\u00A0'}{}
              </span>
            </h5>
            <span
              style={{
                fontWeight: 400
              }}
            >
              {this.props.cnum}: {this.props.cname}
            </span>{" "}
          </div>
          <div className ="col s4">
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
