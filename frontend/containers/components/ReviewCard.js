import React from "react";
import axios from 'axios';

class ReviewCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ratings: [],
      upvotes: 0,
      downvotes: 0,
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
               
               
    
      self.setState({upvotes: response.data.upvotes, downvotes: response.data.downvotes});

          })
          .catch(function (error) {
            console.log(error.response.data.message);
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
               

    
      self.setState({upvotes: response.data.upvotes, downvotes: response.data.downvotes});
    
          })
          .catch(function (error) {
            console.log(error.response.data.message);
          });
    
    
  }

  componentWillMount() {
    this.setState({upvotes:this.props.uvotes});
    this.setState({downvotes:this.props.dvotes});
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
      <div className="card-panel nohover2 white black-text" >
        <h5 style={{
              lineHeight: 0.7
            }}>
          Overall:<span
            style={{
              color: "#d18e01"
            }}
          >
            {this.props.overall} 
          </span> 
        </h5>
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
        <span
          style={{
            fontSize: 20,
            float: "right"
          }}
        >
          <a onClick={this.uClick} onMouseOver="" style={{
              color: "#002a78", cursor:'pointer'
            }}><i className="material-icons prefix">thumb_up</i>{this.state.upvotes}</a>
            <a onClick={this.dClick} onMouseOver="" style={{
              color: "#002a78", cursor:'pointer'
            }}><i className="material-icons prefix">thumb_down</i>{this.state.downvotes}</a>
        </span>
        </span>

      </div>
    );
  }
}

export default ReviewCard;