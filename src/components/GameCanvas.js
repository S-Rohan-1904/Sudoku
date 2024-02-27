import React from "react";
import Cell from "./Cell";
import generateSudoku from "./SudokuGenerator";
import validator from "./InputValidator";
import { useState } from "react";

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
function GameCanvas() {
  const validationArr = Array(9);
  for (let i = 0; i < 9; i++) {
    validationArr[i] = Array(9).fill(true);
  }
  const [isValid, setIsValid] = useState(validationArr); // we have to maintain isvalid for each individual cell
  const [sudokuArr, setSudokuArr] = useState(generateSudoku(45));
  const inputChangeHandler = (data, rindex, cindex) => {
    if (data == 0) {
      // beacuse it is converting to 0 because of +
      data = "";
    }

    sudokuArr[rindex][cindex] = data;

    let validationArrCopy = [...isValid];
    if (!validator(rindex, cindex, data, sudokuArr)) {
      validationArrCopy[rindex][cindex] = false;
      setIsValid(validationArrCopy);
    } else {
      validationArrCopy[rindex][cindex] = true;
      setIsValid(validationArrCopy);
    }
    console.log(sudokuArr);
    winChecker(sudokuArr, data, rindex, cindex);
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
          />
        ))
      )}
    </div>
  );
}

export default GameCanvas;
