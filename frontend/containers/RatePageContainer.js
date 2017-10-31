import ReactStars from 'react-stars'
import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class RatePageContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        courseId: "",
        profID: "",
        comment:"",
        difficulty: 0.0,
        overall: 0.0,
        workload: 0.0
      }
    }

    //course name & professor name
    updateCourse(event){
      this.setState({courseId: event.target.value});
      console.log(this.state.courseId)
    }

    updateProfessor(event){
      this.setState({profID: event.target.value});
      console.log(this.state.profID)
    }

    updateComment(event){
      this.setState({comment: event.target.value});
      console.log(this.state.comment)
    }

    submitReview() {
          // Send a POST request
          axios({
            method: 'post',
            url: 'http://localhost:3000/course/add_rating',
            data: {
              class_id: this.state.courseId,
              prof_id: this.state.profID,
              difficulty_rating: this.state.difficulty,
              overall_rating: this.state.overall,
              workload_rating: this.state.workload,
              comment: this.state.comment
            }
          })
          .then(function (response) {
            console.log(response.status);
            // if(response.data.message){
            //   alert(response.data.message)
            // }
            // if(response.data.redirectUrl){
            //   window.location.replace('http://localhost:3000'+response.data.redirectUrl)
            // }else{
            //
            //   window.location.replace("http://localhost:3000/");
            // }
          })
          .catch(function (error) {
            console.log(error.response.data.message);
          });

        }

render() {

  const overallRating = (newRating) => {
    this.state.overall = (newRating)
    console.log("overall rating is:" + this.state.overall)
    console.log("difficulty rating is:" + this.state.difficulty)
    console.log("workload rating is:" +this.state.workload)
  }

  const difficultyRating = (newRating) => {
    this.state.difficulty = (newRating)
    console.log("overall rating is:" + this.state.overall)
    console.log("difficulty rating is:" + this.state.difficulty)
    console.log("workload rating is:" +this.state.workload)
  }

  const workloadRating = (newRating) => {
    this.state.workload = (newRating)
    console.log("overall rating is:" + this.state.overall)
    console.log("difficulty rating is:" + this.state.difficulty)
    console.log("workload rating is:" +this.state.workload)
  }

    return(
      <div>

      <div className = "header">
          <div className = "header-title"> <span className = "header-title-emory">Emory</span> Course Critique </div>
      </div>

      <div className = "register-body">
        <div className = "rate-body-main-component">
          <div className = "register-body-title">Rate the course</div>
              <div>

                <div className="inputs-sizes">
                  <input
                   type="text"
                   value={this.state.courseId}
                   placeholder="Course your reviewing"
                   className="user-input"
                   onChange= {(event) => this.updateCourse(event)}
                  />
                </div>

                <div className="inputs-sizes">
                  <input
                   type="text"
                   value={this.state.profID}
                   placeholder="Professor of course"
                   className="user-input"
                   onChange={(event) => this.updateProfessor(event)}
                  />
                </div>

                <div className="inputs-sizes-rate">
                <div className = "reate-body-title">Easiness</div>
                <ReactStars
                  count={5}
                  value={this.state.difficulty}
                  onChange={difficultyRating}
                  size={24}
                  color2={'#ffd700'} />
              </div>

              <div className="inputs-sizes-rate">
              <div className = "reate-body-title">Workload</div>
                  <ReactStars
                    count={5}
                    value={this.state.workload}
                    onChange={workloadRating}
                    size={24}
                    color2={'#ffd700'} />
            </div>

            <div className="inputs-sizes-rate">
            <div className = "reate-body-title">Overall</div>
                <ReactStars
                  count={5}
                  value={this.state.overall}
                  onChange={overallRating}
                  size={24}
                  color2={'#ffd700'} />
            </div>


            <div className="inputs-sizes">
              <input
               type="text"
               value={this.state.comment}
               placeholder="comments on the course"
               className="user-input"
               onChange= {(event) => this.updateComment(event)}
              />
            </div>

                <div className="submit-button-row">
                  <button
                  className="submit-button"
                  type="button" onClick={() => this.submitReview()}>
                  submit review!
                  </button>
                </div>

              </div>
              </div>
            </div>

      </div>
      )
    }
  };

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
)(RatePageContainer);
