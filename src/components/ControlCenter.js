import React from "react";

function ControlCenter(props) {
  const clearGameHandler = () => {
    props.onClear(true);
  };
  const newGameHandler = () => {
    props.newGame(true);
  };
  const undoHandler = () => {
    props.onUndo(true);
  };
  const redoHandler = () => {
    props.onRedo(true);
  };
  const eraseHandler = () => {
    props.onErase();
  };
  return (
    <div>
      <button onClick={clearGameHandler}>Clear Game</button>
      <button onClick={newGameHandler}>New Game</button>
      <button onClick={undoHandler}>Undo</button>
      <button onClick={redoHandler}>Redo</button>
      <button onClick={eraseHandler}>Erase</button>
    </div>
  );
}

export default ControlCenter;
