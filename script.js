var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = "";
      }
    }
  }
}

let GetPuzzle = document.getElementById("GetPuzzle");
let SolvePuzzle = document.getElementById("SolvePuzzle");

GetPuzzle.onclick = function () {
  // Load Sudoku puzzle data from the local JSON file

  let index = Math.floor(Math.random() * 7) + 1;
  let filePath = `test/test${index}.json`;
  fetch(filePath) // Adjust the file path accordingly
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      board = data.board;
      FillBoard(board);
    })
    .catch((error) => {
      console.error("Error loading Sudoku puzzle:", error);
    });
};

SolvePuzzle.addEventListener("click", function () {
  sudokuSolver(board, 0, 0, 9);
});

function sudokuSolver(board, row, col, n) {
  // base case
  if (row == n) {
    //print(board, n);
    FillBoard(board);
    return true;
  }
  // if we at last col
  if (col == n) {
    return sudokuSolver(board, row + 1, 0, n);
  }
  // if cell is already filled
  if (board[row][col] != 0) {
    return sudokuSolver(board, row, col + 1, n);
  }
  for (let val = 1; val <= 9; val++) {
    // check val is safe or not?
    if (isSafe(board, row, col, val, n)) {
      board[row][col] = val;
      // recursive call
      let aagesolpossible = sudokuSolver(board, row, col + 1, n);
      if (aagesolpossible) {
        return true;
      }
      // backtracking
      board[row][col] = 0;
    }
  }
  return false;
}

function isSafe(board, row, col, num, n) {
  for (let i = 0; i < n; i++) {
    for (let i = 0; i < n; i++) {
      if (board[row][i] == num) return false;
    }

    // Check column
    for (let i = 0; i < n; i++) {
      if (board[i][col] == num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] == num) return false;
      }
    }

    return true;
  }
}
