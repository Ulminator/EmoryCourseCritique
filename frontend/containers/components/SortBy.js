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
              Date
            </span>
            <i className="material-icons">arrow_drop_down</i>
          </a>
          <div className="collapsible-body">
            <ul>
              <li>
                <a href="#!">Date</a>
              </li>
              <li>
                <a href="#!">Overall</a>
              </li>
              <li>
                <a href="#!">Difficulty</a>
              </li>
              <li>
                <a href="#!">Workload</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    );
  }
}

export default SortBy;
