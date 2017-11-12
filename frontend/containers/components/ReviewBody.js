import React from "react";
import SideNav from "./SideNav";
import Inputfield from "./Inputfield";
import Card from "./Card";
import ReviewCard from "./ReviewCard";
import Footer from "./Footer";
import axios from 'axios';
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
      total_workload:Number

    }

  }

  

  componentWillMount() {
    console.log('mount');
    console.log(location.search);
    
      var self=this;
      var url= '/testtwo'+location.search;
      console.log(url);
    axios.get(url)
        .then(function (response) {
          console.log(response);
          
            
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
          
        })
        .catch(function (error) {
          console.log(error);
        });
    

  }
  componentWillUnmount() {
    console.log('unmount');
  }


  render() {
    
    var cards = [];
    var overalldist =[0,0,0,0,0];
    var difficultydist =[0,0,0,0,0];
    var workloaddist =[0,0,0,0,0];


    console.log(this.state.total_overall/this.state.count);

    console.log(this.props);
    
      var thiscourse='reviews';
      for (var i = 0; i < this.state.ratings.length; i++) {
        overalldist[this.state.ratings[i].overall-1]+=1;
        difficultydist[this.state.ratings[i].difficulty-1]+=1;
        workloaddist[this.state.ratings[i].workload-1]+=1;
        cards.push(<ReviewCard overall={this.state.ratings[i].overall} difficulty={this.state.ratings[i].difficulty} workload={this.state.ratings[i].workload} comment={this.state.ratings[i].comment} rdate={this.state.ratings[i].rated_date} key={i}/>);
      }
      console.log(overalldist);
      console.log(difficultydist);
      console.log(workloaddist);
    
    
    return (
      <div >
        <SideNav avg_overall={(this.state.total_overall/this.state.count).toFixed(2)} />
        <div
          style={{
            margin: "0 auto",
            marginLeft: 15,
            paddingTop: 15
          }}
        >
          <nav
            className
            style={{
              background: "white",
              width: "98%"
            }}
          >
            <div className="nav-wrapper">
              <form>
                <Inputfield/>
              </form>
            </div>
          </nav>
        </div>
        <div
          style={{
            height: 30
          }}
        />
        <div
          style={{
            margin: "0 auto",
            marginLeft: 15
          }}
        >
          <h5
            style={{
              fontWeight: 300
            }}
          >
            Showing Reviews for {this.state.reviewCourse}
          </h5>
        </div>
        <div
          style={{
            height: 20
          }}
        />
        <div className="container"
          style={{
            width: "95%"
          }}
        >
          <div className="row">
            <div className="col s12">

              <div className="card-panel white black-text" >
                <h4>
                  Course:<span
                    style={{
                      color: "#66bb6a"
                    }}
                  >
                    {this.state.reviewCourse}
                  </span>
                </h4>
                <span
                  style={{
                    fontWeight: 400
                  }}
                >
                  Professor: {this.state.reviewProfessor}
                </span>{" "}
                
                <br />
                <span
                  style={{
                    fontWeight: 300
                  }}
                >

                </span>
              </div>
              {cards}
              
            </div>
          </div>
          <div
            style={{
              height: 580
            }}
          />
        </div>
        <Footer />
      </div>
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
