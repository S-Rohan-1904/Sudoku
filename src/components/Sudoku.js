import Cell from "./Cell";
import generateSudoku from "./SudokuGenerator";
import validator from "./InputValidator";
import { useState, useEffect } from "react";
import ControlCenter from "./ControlCenter";
import "./Sudoku.css";

function Sudoku() {
  const [clearGame, setClearGame] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [initial, setInitial] = useState(generateSudoku(45));
  const [history, setHistory] = useState([]);
  const [win, setWin] = useState(false);

  const clearHandler = (clear) => {
    setClearGame(clear);
    setWin(false);
  };
  const newGameHandler = (newGame) => {
    setNewGame(newGame);
    setWin(false);
  };
  useEffect(() => {
    setWin(false);
  }, []);
  const winHandler = () => {
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
        if (!sudokuArr[i].includes("")) {
          win = true;
        } else {
          break;
        }
      }
      if (win) {
        alert("You won!!"); // handle what to do after win
      }
    }
    setWin(win);
  };
  const undoHandler = () => {
    if (history.length >= 1) {
      let element = history[history.length - 1];
      const updatedHistory = history.filter((historyObj, index) => {
        if (index < history.length - 1) {
          return historyObj;
        }
      });
      console.log(updatedHistory);
      setHistory(updatedHistory);
      const updatedSudokuArr = sudokuArr.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if ((rowIndex == element.rindex) & (colIndex == element.cindex)) {
            return "";
          } else {
            return cell;
          }
        });
      });
      setSudokuArr(updatedSudokuArr);
      const updatedValidationArr = validationArr.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if (rowIndex == element.rindex && colIndex == element.cindex) {
            return validator(
              element.rindex,
              element.cindex,
              element.data,
              sudokuArr
            );
          } else {
            return isValid[rowIndex][colIndex];
          }
        });
      });
      setIsValid(updatedValidationArr);
    }
  };

  useEffect(() => {
    if (clearGame) {
      setSudokuArr(initial);
      setClearGame(false);
      setHistory([]);
      for (let i = 0; i < 9; i++) {
        validationArr[i] = Array(9).fill(true);
      }
      setIsValid(validationArr);
    }
  }, [clearGame]);

  useEffect(() => {
    if (newGame) {
      const initialSudoku = generateSudoku(45);
      setHistory([]);
      setInitial(initialSudoku);
      setSudokuArr(initialSudoku);
      setNewGame(false);
      const validationArr = Array(9);
      for (let i = 0; i < 9; i++) {
        validationArr[i] = Array(9).fill(true);
      }
      setIsValid(validationArr);
    }
  }, [newGame]);

  const validationArr = Array(9);
  for (let i = 0; i < 9; i++) {
    validationArr[i] = Array(9).fill(true);
  }

  const [isValid, setIsValid] = useState(validationArr); // we have to maintain isvalid for each individual cell

  const [sudokuArr, setSudokuArr] = useState(initial);

  const [currentCell, setCurrentCell] = useState(null);
  const focusChangeHandler = (rindex, cindex) => {
    setCurrentCell({ rindex: rindex, cindex: cindex });
  };

  const eraseHandler = () => {
    const erasedHistory = history.filter((historyObj) => {
      if (
        sudokuArr[currentCell.rindex][currentCell.cindex] != historyObj.data
      ) {
        return historyObj;
      }
    });
    setHistory(erasedHistory);
    console.log(erasedHistory);
    const updatedSudokuArr = sudokuArr.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex == currentCell.rindex && colIndex == currentCell.cindex) {
          return "";
        } else {
          return cell;
        }
      });
    });
    setSudokuArr(updatedSudokuArr);
    const updatedValidationArr = validationArr.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex == currentCell.rindex && colIndex == currentCell.cindex) {
          return validator(
            currentCell.rindex,
            currentCell.cindex,
            cell,
            sudokuArr
          );
        } else {
          return isValid[rowIndex][colIndex];
        }
      });
    });
    setIsValid(updatedValidationArr);
  };

  const inputChangeHandler = (data, rindex, cindex) => {
    if (data >= 0 && data <= 9) {
      setHistory((prevState) => [
        ...prevState,
        { data: data == 0 ? "" : data, rindex: rindex, cindex: cindex },
      ]);
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
      setSudokuArr(updatedSudokuArr);
    }
  };

  return (
    <>
      {win && <h3 className="win">You win!!</h3>}
      <div className="sudoku">
        {sudokuArr.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <Cell
              key={rowIndex.toString() + columnIndex.toString()} //we can't use key as a prop
              cindex={columnIndex}
              rindex={rowIndex}
              enteredValue={cell}
              onInputChange={inputChangeHandler}
              onFocusChange={focusChangeHandler}
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
        onErase={eraseHandler}
        onWin={winHandler}
      />
    </>
  );
}

export default Sudoku;
