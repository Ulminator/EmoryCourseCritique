import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class RatePageContainer extends Component {
  render() {

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
                   placeholder="Course your reviewing"
                   className="user-input"
                  />
                </div>

                <div className="inputs-sizes">
                  <input
                   type="text"
                   placeholder="Professor of course"
                   className="user-input"
                  />
                </div>

                <div className="inputs-sizes-rate">
                <div className = "reate-body-title">Easiness</div>
                  <fieldset className="rating">
                      <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
                      <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
                      <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
                      <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
                      <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
                </fieldset>
              </div>

              <div className="inputs-sizes-rate">
              <div className = "reate-body-title">Workload</div>
                <fieldset className="rating">
                    <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
                    <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
                    <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
                    <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
                    <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
              </fieldset>
            </div>

            <div className="inputs-sizes-rate">
            <div className = "reate-body-title">Overall</div>
              <fieldset className="rating">
                  <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
                  <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
                  <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
                  <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
                  <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
            </fieldset>
          </div>

                <div className="submit-button-row">
                  <button
                  className="submit-button"
                  type="button">
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
