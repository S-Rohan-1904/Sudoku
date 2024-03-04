import React from "react";

function ControlCenter(props) {
  const clearGameHandler = () => {
    props.onClear(true);
  };
  const newGameHandler = () => {
    props.newGame(true);
  };
  return (
    <div>
      <button onClick={clearGameHandler}>Clear Game</button>
      <button onClick={newGameHandler}>New Game</button>
    </div>
  );
}

export default ControlCenter;
