import React from "react";
import "./ControlCenter.css";

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
  const eraseHandler = () => {
    props.onErase();
  };
  const winHandler = () => {
    props.onWin();
  };
  return (
    <div className="wrapper">
      <a onClick={clearGameHandler} className="control-center">
        Clear Game
      </a>
      <a onClick={newGameHandler} className="control-center">
        New Game
      </a>
      <a onClick={undoHandler} className="control-center">
        Undo
      </a>
      <a onClick={eraseHandler} className="control-center">
        Erase
      </a>
      <a onClick={winHandler} className="control-center">
        Check Win
      </a>
    </div>
  );
}

export default ControlCenter;
