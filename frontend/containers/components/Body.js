import React from "react";
import Title from "./Title";
import NavBar from "./NavBar";


class Body extends React.Component {
  render() {
    return (
      <div className="body-container">
      <NavBar />

        <div className="container">
          <div className="row">
            <div className="hide-on-small-only"
              style={{
                height: "24px"
              }}
            />
            <Title />
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
