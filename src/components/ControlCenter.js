import React from "react";

function ControlCenter(props) {
  const clickHandler = () => {
    props.onClear(true);
  };
  return (
    <div>
      <button onClick={clickHandler}>Clear Game</button>
    </div>
  );
}

export default ControlCenter;
