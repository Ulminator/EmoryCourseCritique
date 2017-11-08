import React from "react";
import SortBy from "./SortBy";
import Tags from "./Tags";

class SideNav extends React.Component {
  render() {
    return (
      <ul id="slide-out" className="side-nav fixed">
        <li>
          <div className="user-view">
            <div className="background">
              <img className src="imgs/darkgoldbackground.png" />
            </div>
            <a href="#!user">
              <img className="circle" src="imgs/placeholder.png" />
            </a>
            <a href="#!name">
              <span className="white-text name">Rusty Fox</span>
            </a>
            <a href="#!email">
              <span className="white-text email">rustiestfox@emory.edu</span>
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
            paddingTop: 5,
            paddingBottom: 5
          }}
        >
          <h2 className="center">{this.props.avg_overall}</h2>
        </li>
        <li className="divider" />
        <li>
          <Tags />
          <h5 />
        </li>
        <li
          style={{
            paddingLeft: 10,
            marginBottom: 25
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
    );
  }
}

export default SideNav;
