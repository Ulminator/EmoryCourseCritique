import React from "react";

class Inputfield extends React.Component {
  render() {
    return (
      <div className="input-field">
        <input
          id="search"
          type="search"
          className="autocomplete"
          placeholder="Search for a class"
          required
          autoFocus="autoFocus"
          autoComplete ="off"
        />
        <label
          className="label-icon inputOverride"
          htmlFor="search" 
        >
          <i
            className="material-icons inputIconOverride"
          >
            search
          </i>
        </label>
        <i className="material-icons">close</i> 
      </div>
    );
  }
}

export default Inputfield;
