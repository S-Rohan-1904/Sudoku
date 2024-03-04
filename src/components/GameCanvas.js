import React from "react";
import Cell from "./Cell";
import generateSudoku from "./SudokuGenerator";
import validator from "./InputValidator";
import { useState, useEffect } from "react";

const winChecker = (sudoku, data, rindex, cindex) => {
  let win;
  for (let i = 0; i < 9; i++) {
    win = false;
    if (!sudoku[i].includes("") && validator(rindex, cindex, data, sudoku)) {
      win = true;
    } else {
      break;
    }
  }
  if (win) {
    alert("You won!!"); // handle what to do after win
  }
};
const initialSudoku = generateSudoku(45);
function GameCanvas() {
  const validationArr = Array(9);
  for (let i = 0; i < 9; i++) {
    validationArr[i] = Array(9).fill(true);
  }
  const [isValid, setIsValid] = useState(validationArr); // we have to maintain isvalid for each individual cell
  const [sudokuArr, setSudokuArr] = useState(initialSudoku);

  const inputChangeHandler = (data, rindex, cindex) => {
    if (data == 0) {
      // beacuse it is converting to 0 because of +
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

    let validationArrCopy = [...isValid];
    if (!validator(rindex, cindex, data, sudokuArr)) {
      validationArrCopy[rindex][cindex] = false;
      setIsValid(validationArrCopy);
    } else {
      validationArrCopy[rindex][cindex] = true;
      setIsValid(validationArrCopy);
    }
    winChecker(sudokuArr, data, rindex, cindex);
    setSudokuArr(updatedSudokuArr);
  };
  return (
    <div className="gameCanvas">
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
  );
}

export default GameCanvas;
