//We redefined the function because before all validators didn't have access to sudoku

const validator = (i, j, num, sudoku) => {
  if (num == "") {
    return true;
  } else {
    return (
      rowValidator(i, j, num, sudoku) &&
      columnValidator(i, j, num, sudoku) &&
      gridValidator(i, j, num, sudoku)
    );
  }
};

// grid validator requires row start and col start of the grid
const gridValidator = (rtemp, ctemp, num, sudoku) => {
  //try to optimise this part
  let rowStart, colStart;
  if (rtemp <= 2) {
    rowStart = 0;
  } else if (rtemp <= 5) {
    rowStart = 3;
  } else {
    rowStart = 6;
  }
  if (ctemp <= 2) {
    colStart = 0;
  } else if (ctemp <= 5) {
    colStart = 3;
  } else {
    colStart = 6;
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        rowStart + i != rtemp &&
        colStart + j != ctemp &&
        sudoku[rowStart + i][colStart + j] === num
      ) {
        return false;
        //just like moving the cordinate system
      }
    }
  }
  return true;
};

// Check in the row for existence
const rowValidator = (rtemp, ctemp, num, sudoku) => {
  for (let j = 0; j < 9; j++) {
    if (j != ctemp && sudoku[rtemp][j] == num) {
      return false;
    }
  }
  return true;
};

// Check in the column for existence
const columnValidator = (rtemp, ctemp, num, sudoku) => {
  for (let i = 0; i < 9; i++) {
    if (i != rtemp && sudoku[i][ctemp] == num) {
      return false;
    }
  }
  return true;
};

export default validator;
