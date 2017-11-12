import React from "react";


class ReviewCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ratings: []
      
    }
    
    
  }

  

  render() {
    //var date= this.props.rdate.toString();
    console.log(this.props.rdate);
    if(this.props.rdate)
    {
      var date= new Date(this.props.rdate);
      var dateformat= ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
    }

    return (
      <div className="card-panel white black-text" >
        <h4 style={{
              lineHeight: 0.7
            }}>
          Overall:<span
            style={{
              color: "#66bb6a"
            }}
          >
            {this.props.overall} 
          </span> 
        </h4>
        <span
          style={{
            fontWeight: 300,
            fontSize: 15
          }}
        >
          {dateformat}

        </span>
        <br />
        <span
          style={{
            fontWeight: 400
          }}
        >
          Difficulty: {this.props.difficulty}
        </span>{" "}
        <br />
        <span
          style={{
            fontWeight: 400
          }}
        >
          Workload: {this.props.workload}
        </span>{" "}
        <br />
        <span
          style={{
            fontWeight: 300
          }}
        >
        Comment: {this.props.comment}
        </span>
      </div>
    );
  }
}

export default ReviewCard;