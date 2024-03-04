import React from "react";
import Cell from "./Cell";
import generateSudoku from "./SudokuGenerator";
import validator from "./InputValidator";
import { useState, useEffect } from "react";
import ControlCenter from "./ControlCenter";

const winChecker = (sudoku, data, rindex, cindex, isValid) => {
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
const initialSudoku = generateSudoku(2);
function Sudoku() {
  const [clearGame, setClearGame] = useState(false);
  const clearHandler = (clear) => {
    setClearGame(clear);
  };
  useEffect(() => {
    if (clearGame) {
      setSudokuArr(initialSudoku);
      setClearGame(false);
    }
  }, [clearGame]);
  const validationArr = Array(9);
  for (let i = 0; i < 9; i++) {
    validationArr[i] = Array(9).fill(true);
  }
  const [isValid, setIsValid] = useState(validationArr); // we have to maintain isvalid for each individual cell
  const [sudokuArr, setSudokuArr] = useState(initialSudoku);

  const inputChangeHandler = (data, rindex, cindex) => {
    if (data == 0) {
      // because it is converting to 0 because of +
      data = "";
    }

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
    winChecker(sudokuArr, data, rindex, cindex, updatedValidationArr);
    setSudokuArr(updatedSudokuArr);
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
              readOnly={initialSudoku[rowIndex][columnIndex] != ""}
            />
          ))
        )}
      </div>
      <ControlCenter onClear={clearHandler} />
    </>
  );
}

export default Sudoku;
