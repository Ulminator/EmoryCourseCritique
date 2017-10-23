import React from "react";
import SideNav from "./SideNav";
import Inputfield from "./Inputfield";
import Card from "./Card";
import Footer from "./Footer";

class ReviewBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      
    }
    //this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(val) {
    this.setState({
      courses: val
    })
    
  }


  render() {
    return (
      <div>
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
                <Inputfield onUpdate={this.onUpdate.bind(this)}/>
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
            Showing Results for CS370
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

              <Card passedVal={this.state.courses}/>
              
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

export default ReviewBody;
