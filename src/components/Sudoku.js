import React from "react";
import Cell from "./Cell";
import generateSudoku from "./SudokuGenerator";
import validator from "./InputValidator";
import { useState, useEffect } from "react";
import ControlCenter from "./ControlCenter";

const winChecker = (sudoku, isValid) => {
  let validity = true;
  for (let i = 0; i < 9; i++) {
    if (isValid[i].includes(false)) {
      validity = false;
      break;
    }
  }
  let win;
  if (validity) {
    for (let i = 0; i < 9; i++) {
      win = false;
      if (!sudoku[i].includes("")) {
        win = true;
      } else {
        break;
      }
    }
    if (win) {
      alert("You won!!"); // handle what to do after win
    }
  }
};

function Sudoku() {
  const [clearGame, setClearGame] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [undo, setUndo] = useState(false);
  const [redo, setRedo] = useState(false);
  const [initial, setInitial] = useState(generateSudoku(45));
  const clearHandler = (clear) => {
    setClearGame(clear);
  };
  const newGameHandler = (newGame) => {
    setNewGame(newGame);
  };
  const undoHandler = (undo) => {
    setUndo(undo);
  };
  const redoHandler = (redo) => {
    setRedo(redo);
  };
  useEffect(() => {
    if (clearGame) {
      setSudokuArr(initial);
      setClearGame(false);
      for (let i = 0; i < 9; i++) {
        validationArr[i] = Array(9).fill(true);
      }
      setIsValid(validationArr);
    }
  }, [clearGame]);
  useEffect(() => {
    if (newGame) {
      const initial = generateSudoku(45);
      setInitial(initial);
      setSudokuArr(initial);
      setNewGame(false);
      const validationArr = Array(9);
      for (let i = 0; i < 9; i++) {
        validationArr[i] = Array(9).fill(true);
      }
      setIsValid(validationArr);
    }
  }, [newGame]);
  useEffect(() => {
    if (undo) {
      if (prevSudokuArr != null) {
        setSudokuArr(prevSudokuArr);
        setPrevSudokuArr(sudokuArr);
      }
      setUndo(false);
    }
  }, [undo]);
  useEffect(() => {
    if (redo) {
      setSudokuArr(prevSudokuArr);
      setPrevSudokuArr(sudokuArr);
      setRedo(false);
    }
  }, [redo]);
  const validationArr = Array(9);
  for (let i = 0; i < 9; i++) {
    validationArr[i] = Array(9).fill(true);
  }
  const [isValid, setIsValid] = useState(validationArr); // we have to maintain isvalid for each individual cell
  const [sudokuArr, setSudokuArr] = useState(initial);
  const [prevSudokuArr, setPrevSudokuArr] = useState(null);
  const inputChangeHandler = (data, rindex, cindex) => {
    if (data >= 0 && data <= 9) {
      if (data == 0) {
        // because it is converting to 0 because of +
        data = "";
      }
      setPrevSudokuArr(sudokuArr);
      const updatedSudokuArr = sudokuArr.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if ((rowIndex == rindex) & (colIndex == cindex)) {
            return data;
          } else {
            return cell;
          }
        });
      });

      const updatedValidationArr = validationArr.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if (rowIndex == rindex && colIndex == cindex) {
            return validator(rindex, cindex, data, sudokuArr);
          } else {
            return isValid[rowIndex][colIndex];
          }
        });
      });
      setIsValid(updatedValidationArr);
      winChecker(sudokuArr, updatedValidationArr);
      setSudokuArr(updatedSudokuArr);
    }
  };

  return (
    <>
      <div className="sudoku">
        {sudokuArr.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <Cell
              key={rowIndex.toString() + columnIndex.toString()} //we can't use key as a prop
              cindex={columnIndex}
              rindex={rowIndex}
              enteredValue={cell}
              onInputChange={inputChangeHandler}
              className={`${isValid[rowIndex][columnIndex] ? "" : "invalid"}`}
              readOnly={initial[rowIndex][columnIndex] != ""}
            />
          ))
        )}
      </div>
      <ControlCenter
        onClear={clearHandler}
        newGame={newGameHandler}
        onUndo={undoHandler}
        onRedo={redoHandler}
      />
    </>
  );
}

export default Sudoku;
