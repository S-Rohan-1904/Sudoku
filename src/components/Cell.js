import "./Cell.css";
import React from "react";

const Cell = (props) => {
  const inputChangeHandler = (e) => {
    props.onInputChange(+e.target.value, props.rindex, props.cindex); //+ symbol for it to be a number
  };
  const focusHandler = (e) => {
    if (props.readOnly == false) {
      props.onFocusChange(props.rindex, props.cindex);
    } else {
      props.onFocusChange(null);
    }
  };
  let classes = "cellInput " + props.className;
  return (
    <input
      type="number"
      max="9"
      min="1"
      value={props.enteredValue}
      className={classes}
      onChange={inputChangeHandler}
      readOnly={props.readOnly}
      onFocus={focusHandler}
    />
  );
};

export default Cell;
