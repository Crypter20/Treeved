import React from "react";

const PageList = (props) => {
  if (props.data.count === 0) {
    return null;
  }
  return (
    <React.Fragment>
      <label htmlFor="user">Currently Managing</label>
      <select>
        {props.data.results.map((page) => (
          <option key={page.id} value={page.name}>
            {page.name}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default PageList;
