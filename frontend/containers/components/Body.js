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
            <div
              style={{
                height: "9vh"
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
