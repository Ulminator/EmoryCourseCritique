import React from "react";
import axios from 'axios';

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
  }

  

  render() {
    

    return (
      <div className="card-panel white black-text" onClick={this.onClick}>
        <h4>
          {this.props.cnum}:<span
            style={{
              color: "#66bb6a"
            }}
          >
            {this.props.cname}
          </span>
        </h4>
        <span
          style={{
            fontWeight: 400
          }}
        >
          {this.props.professor}
        </span>{" "}
        <br />
        <span
          style={{
            fontWeight: 300
          }}
        >
        Rating: {this.props.rating}
        </span>
      </div>
    );
  }
}

export default Card;
