import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      
    }
    
  }

  render() {
    

    return (
      <div className="card-panel white black-text">
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
          Review
        </span>{" "}
        <br />
        <span
          style={{
            fontWeight: 300
          }}
        >

        </span>
      </div>
    );
  }
}

export default Card;
