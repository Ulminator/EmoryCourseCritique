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
          Rating:<span
            style={{
              color: "#66bb6a"
            }}
          >
             Good
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
          {this.props.passedVal}
        </span>
      </div>
    );
  }
}

export default Card;
