import React, {Component} from 'react';
import { connect } from 'react-redux';
import Footer from "./components/Footer";
import NavBarWithLogo from "./components/NavBarWithLogo";

class AboutPageContainer extends Component {
  constructor(props) {
    super(props)
    console.log(props);
  }
  render() {
    return(
     <div>
        <div style={{backgroundColor: "#002978", height: "64px"}}>
          <NavBarWithLogo/>
        </div>
        <div className="container">
          <div style={{height: "45px"}}></div>
            <h2 className="center" style={{fontWeight: "300"}}>Meet Your Boys</h2>
          <div style={{height: "45px"}}></div>
          <div className="row">
            <div className="col s12 m4 l4 marginCol">
              <img src="https://pbs.twimg.com/profile_images/927521433965785089/0nO-z1D4.jpg" alt="" className="circle responsive-img aboutPics"/>
              <p className="center aboutName">Alex Lin<br/> <span className="aboutJob">Scrum Master</span></p>
            </div>
             <div className="col s12 m4 l4 marginCol">
              <img src="https://preview.ibb.co/joj7Sw/axoloto.jpg" alt="" className="circle responsive-img aboutPics" style={{width: "145px"}}/>
              <p className="center aboutName">Axel Chauvin<br/> <span className="aboutJob">Database Man</span></p>

            </div>
             <div className="col s12 m4 l4 marginCol">
              <img src="https://image.ibb.co/mdSBnw/colin.jpg" alt="" className="circle responsive-img aboutPics" style={{width: "145px"}}/>
              <p className="center aboutName">Colin Jiang<br/> <span className="aboutJob">React Master</span></p>

            </div>
          </div>
           <div className="row marginCol2">
            <div className="col s12 m4 l4 marginCol">
              <img src="https://i.pinimg.com/originals/b4/52/2e/b4522e62359b306c80283c3a057f7c66.jpg" alt="" className="circle responsive-img aboutPics"/>
              <p className="center aboutName">Justin Luo<br/> <span className="aboutJob">Designer</span></p>
         
            </div>
             <div className="col s12 m4 l4 marginCol">
              <img src="https://preview.ibb.co/k4D3Zb/poro.jpg" alt="" className="circle responsive-img aboutPics" style={{width: "145px"}}/>
              <p className="center aboutName">Antonio Chan<br/> <span className="aboutJob">Frontend Man</span></p>
           
            </div>
             <div className="col s12 m4 l4 marginCol">
              <img src="https://image.ibb.co/eUufxw/matt.jpg" alt="" className="circle responsive-img aboutPics" style={{width: "145px", height:"145px"}}/>
              <p className="center aboutName">Matt Ulmer<br/> <span className="aboutJob">Frontend Man</span></p>
           
            </div>
          </div>
        </div>
        <div style={{height: "45px"}}></div>
        <div>
           <Footer/>
        </div>
    </div>
    )
  }
};


const mapStateToProps = (state) => {
  return{
    state
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutPageContainer);