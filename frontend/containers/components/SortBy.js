import React from "react";

class SortBy extends React.Component {
  render() {
    return (
      <ul className="collapsible collapsible-accordion" style={{}}>
        <li>
          <a className="collapsible-header waves-effect">
            Sorted By:{" "}
            <span
              style={{
                color: "#002878",
                fontWeight: 500
              }}
            >
              Professor
            </span>
            <i className="material-icons">arrow_drop_down</i>
          </a>
          <div className="collapsible-body">
            <ul>
              <li>
                <a href="#!">Ratings</a>
              </li>
              <li>
                <a href="#!">Professors</a>
              </li>
              <li>
                <a href="#!">Winrate</a>
              </li>
              <li>
                <a href="#!">Something else</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    );
  }
}

export default SortBy;
