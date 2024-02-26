const generateSudoku = (K) => {
  let sudoku = new Array(9); // Creates an empty array of length 9
  for (let i = 0; i < 9; i++) {
    sudoku[i] = new Array(9).fill("");
  }

  // Returns false if given 3 x 3 block contains num.
  //It requires the starting row and col of the grid
  const gridValidator = (rowStart, colStart, num) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (sudoku[rowStart + i][colStart + j] === num) {
          return false;
        } //just like moving the cordinate system
      }
    }
    return true;
  };
  // Check in the row for existence
  const rowValidator = (i, num) => {
    return !sudoku[i].includes(num);
  };

  // Check in the column for existence
  const columnValidator = (j, num) => {
    for (let i = 0; i < 9; i++) {
      if (sudoku[i][j] === num) {
        return false;
      }
    }
    return true;
  };

  // Random number generator
  const randomGenerator = (num) => {
    //(0 to num-1) + 1
    return Math.floor(Math.random() * num) + 1; //1 to num
  };

  // Fill the diagonal of 3 x 3 matrices because diagonal elements are independent of the non diagonal elements and after that fills all diagonal matrices
  const fillDiagonal = () => {
    for (let k = 0; k < 9; k += 3) {
      // for k=0, the fillgrid fills the first diagonal 3*3 matrix and so on..
      let num;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          do {
            num = randomGenerator(9); //1 to 9
          } while (!gridValidator(k, k, num)); // we need to check if the entry is already used in the 3*3 grid or not. Hence we input the start row and col value of the grid
          sudoku[k + i][k + j] = num;
        }
      }
    }
  };

  // Check if safe to put in cell
  const validator = (i, j, num) => {
    return (
      rowValidator(i, num) &&
      columnValidator(j, num) &&
      gridValidator(i - (i % 3), j - (j % 3), num)
    );
  };

  // A recursive function to fill remaining matrix
  const fillRemainingGrid = (i, j) => {
    if (j >= 9 && i < 8) {
      i++;
      j = 0;
    }
    if (i >= 9 && j >= 9) {
      return true;
    }
    if (i < 3) {
      if (j < 3) {
        j = 3;
      }
    } else if (i < 6) {
      if (j === Math.floor(i / 3) * 3) {
        j += 3;
      }
    } else {
      if (j === 6) {
        i++;
        j = 0;
        if (i >= 9) {
          return true;
        }
      }
    }

    for (let num = 1; num <= 9; num++) {
      if (validator(i, j, num)) {
        sudoku[i][j] = num;
        if (fillRemainingGrid(i, j + 1)) {
          return true;
        }
        sudoku[i][j] = 0;
      }
    }
    return false;
  };

  // Remove K number of digits to complete the game
  const removeEntries = () => {
    let count = K;
    while (count !== 0) {
      let i = Math.floor(Math.random() * 9); // Way to generate random integer value from 0 to 8 (1 is not included in Math.random())
      let j = Math.floor(Math.random() * 9);
      if (sudoku[i][j] !== "") {
        count--;
        sudoku[i][j] = "";
      }
    }
  };

  // Generate Sudoku
  fillDiagonal();
  fillRemainingGrid(0, 3);
  removeEntries();
  return sudoku;
};

export default generateSudoku;
