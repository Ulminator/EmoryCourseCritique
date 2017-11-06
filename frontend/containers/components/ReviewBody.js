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
      ratings: []
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

    console.log(this.props);
    
      var thiscourse='reviews';
      for (var i = 0; i < this.state.ratings.length; i++) {
        cards.push(<ReviewCard overall={this.state.ratings[i].overall} difficulty={this.state.ratings[i].difficulty} workload={this.state.ratings[i].workload} comment={this.state.ratings[i].comment} key={i}/>);
      }
    
    
    return (
      <div >
        <SideNav />
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
            Showing Results for {thiscourse}
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
