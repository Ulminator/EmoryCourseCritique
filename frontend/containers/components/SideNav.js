import React from "react";
import SortBy from "./SortBy";
import Tags from "./Tags";

class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      left: "0px"
      
    }
    this.toggle = this.toggle.bind(this);
    
  }

  toggle() {

    if (this.state.left === "0px") {
        this.setState({left: "315px"});
    } else {
        this.setState({left: "0px"});
    }
  }

  render() {
    return (
    <aside id="left-sidebar-nav">
      <ul id="slide-out" className="side-nav fixed" style={{paddingTop:56, height:"100%", zIndex:0, left:this.state.left}}>
        <li>
          <div className="user-view">
            <div className="background" style={{backgroundColor: "white"}}>
              
            </div>
            <a href="#!user">
              <img className="circle" src="imgs/placeholder.png" />
            </a>
            <a href="#!name">
              <span className="black-text name">Rusty Fox</span>
            </a>
            <a href="#!email">
              <span className="black-text email">rustiestfox@emory.edu</span>
            </a>
          </div>
        </li>
        <SortBy />
        <li className="divider" />
        <li className="no-padding" />
        <li>
          <h5
            style={{
              paddingLeft: 10,
              paddingTop: 5,
              fontSize: 18
            }}
          >
            Overall Rating:{" "}
          </h5>
          <h5 />
        </li>
        <li
          style={{
            paddingBottom: 2
          }}
        >
          <h3 className="center">{this.props.avg_overall}</h3>
        </li>
        <li className="divider" />
        <li>
          <Tags />
          <h5 />
        </li>
        <li
          style={{
            paddingLeft: 10,
          }}
        >
          <div className="chip">
            <img src="imgs/placeholder2.png" alt="Contact Person" />
            Hard Test Grader
          </div>
          <div className="chip">
            <img src="imgs/placeholder2.png" alt="Contact Person" />
            Fun class
          </div>
          <div className="chip">
            <img src="imgs/placeholder2.png" alt="Contact Person" />
            Scrum
          </div>
          <div className="chip">
            <img src="imgs/placeholder2.png" alt="Contact Person" />
            lots of homework
          </div>
        </li>
      </ul>
      <a href="#" data-activates="slide-out" className="button-collapse btn-floating btn-medium waves-effect waves-light hide-on-med-and-up" onClick={this.toggle} style={{zIndex:100, position:"fixed", backgroundColor:"transparent", boxShadow:"none"}}><i className="material-icons">menu</i></a>
    </aside>
    );
  }
}

export default SideNav;
